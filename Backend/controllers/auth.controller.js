import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import generateConCode from '../config/generateConCode.js';
import generateReferralCode from '../config/generateReferralCode.js';
import User from '../models/user.model.js'
import ContributionAccount from '../models/contribution.model.js'
import { getFirstThursdayAfter, addWeeks} from '../config/firstThursday.js'
import { sendVerificationToken, verifyToken } from '../config/termii.js';

import { JWT_EXPIRES_IN, JWT_SECRET } from '../config/env.js';

const signUp = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // logic to create a new user
        let { name, email, phone, password } = req.body;

        // ✅ Normalize phone to international format (Nigerian default)
        let formatPhone = phone.replace(/\s+/g, '').replace(/^\+/, ''); 
        if (phone.startsWith("0")) {
            phone = "234" + phone.slice(1);
        }

        // To check if user already exists
        const existingUser = await User.findOne({ phone })

        if(existingUser) {
            const error = new Error('User already exists');
            error.statusCode = 409;
            throw error;
        }

        // Hash Password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        // create new user
        const newUsers = await User.create([{ name, email, phone: formatPhone, password: hashedPassword }], { session });

        const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            message: 'User created Successfully',
            data: {
                token,
                user: newUsers[0]
            }
        })


    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}

const login = async (req, res, next) => {

    try {
        const { phone, password } = req.body

        const user = await User.findOne({ phone });

        if(!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid) {
            const error = new Error('Invalid Password');
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        res.status(200).json({
            success: true,
            message: "User logged in succesfully",
            data: {
                token,
                user,
            }
        });

    } catch (error) {
        next(error)
    }
}

const activateAccount = async (req, res, next) => {
    try {

        //Cloudinary
        const registrationProofUrl = req.files?.registrationProof?.[0]?.path;
        if(!registrationProofUrl) {
            const error = new Error('Registration proof is required');
            error.statusCode = 400;
            throw error;
        };

        //user activation details
        const userId = req.user.id
        const {
            sex,
            bankName,
            accountNumber,
            residentialAddress,
            nextOfKinName,
            nextOfKinPhone,
            nextOfKinAddress,
        } = req.body;

        
        if(!userId) {
            const error = new Error('User Id is required');
            error.statusCode = 400;
            throw error;
        };

        // Update user with activation form details
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                sex,
                bankName,
                accountNumber,
                residentialAddress,
                registrationFeeUrl: registrationProofUrl,
                isRegistered: false,
                nextOfKin: {
                    name: nextOfKinName,
                    phone: nextOfKinPhone,
                    address: nextOfKinAddress,
                },
                activatedAt: new Date()

            },
            { new: true }
        )

        if(!updatedUser) {
            const error = new Error('User not found');
            error.statusCode = 400;
            throw error;
        };

        // validate referral code if provided
        let referredBy = null;
        if (req.body.referralCode) {
        const refAcc = await ContributionAccount.findOne({ referralCode: req.body.referralCode });
            if (!refAcc) {
                const error = new Error("Invalid referral code");
                error.statusCode = 400;
                throw error;
            }
            referredBy = refAcc._id;
        }

        //To create contribution account
        const newReferralCode = await generateReferralCode();
        const code = await generateConCode(userId);
        const firstThursday = getFirstThursdayAfter(); // finds the next Thursday from today
        const dueDate = addWeeks(firstThursday, 30); 
        const dueDatePlusOneWeek = addWeeks(dueDate, 1); // one week later

        const newContribution = await ContributionAccount.create({
            userId: updatedUser._id,
            referralCode: newReferralCode,
            code,
            isPrimary: true,
            referredBy,
            firstThursday,
            dueDate,
            dueDatePlusOneWeek,
            status: "active"
        });

        res.status(200).json({
        success: true,
        message: 'Account activated and primary contribution account created',
        data: {
            user: updatedUser,
            contribution: newContribution,
        },
        });

    } catch (error) {
        next(error);
    }
}


const forgotPassword = async (req, res, next) => {
    let response; 

    try {
        const { phone } = req.body;

        if (!phone) {
            throw new Error("Phone number is required");
        }


        // Call Termii to send OTP
        response = await sendVerificationToken(phone);

        // Check if Termii actually succeeded
        if (!response || !response.pin_id) {
            return res.status(500).json({
                message: "Failed to send OTP. Please try again later.",
                error: response || "No response from Termii"
            });
        }

        // Save pin_id for later verification (in DB against the user)
        await User.updateOne({ phone }, { resetPinId: response.pin_id });

        res.json({ message: "OTP sent successfully", pinId: response.pin_id });
    } catch (error) {
        next(error);
    }
}

const verifyOtp = async (req, res, next) => {
    try {
        const { phone, pin, pinId } = req.body;

        const result = await verifyToken(pinId, pin);

        if (result.verified === true) {
            // Mark OTP verified for this user
            await User.updateOne({ phone }, { otpVerified: true });

            res.json({ message: "OTP verified, you may reset password now" });
        } else {
            res.status(400).json({ message: "Invalid OTP" });
        }
    } catch (error) {
        next(error);
    }
}


const resetPassword = async (req, res, next) => {
    try {
        const { phone, newPassword } = req.body;
        const user = await User.findOne({ phone });

        if (!user || !user.otpVerified) {
            return res.status(400).json({ message: "OTP not verified" });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        user.otpVerified = false; // reset the flag
        user.resetPinId = null;   // clear the pinId
        await user.save();

        res.json({ message: "Password reset successfully" });
    } catch (error) {
        next(error);
    }
}

// Update profile
const updateProfile = async (req, res, next) => {
    try {
        const userId = req.user.id; 
        const {
        sex,
        accountName,
        accountNumber,
        residentialAddress,
        nextOfKinName,
        nextOfKinPhone,
        nextOfKinAddress,
        } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
            sex,
            accountName,
            accountNumber,
            residentialAddress,
            nextOfKin: {
            name: nextOfKinName,
            phone: nextOfKinPhone,
            address: nextOfKinAddress,
            },
        },
        { new: true }
        ).select("-password"); // don’t send password back

        if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
        }

        res.json({
        message: "Profile updated successfully",
        user: updatedUser,
        });
    } catch (error) {
        next(error);
    }
};


export {
    signUp, 
    login,
    activateAccount, 
    forgotPassword,
    verifyOtp,
    resetPassword,
    updateProfile
}
