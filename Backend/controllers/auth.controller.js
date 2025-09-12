import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import generateConCode from '../utils/generateConCode.js';
import generateReferralCode from '../utils/generateReferralCode.js';
import User from '../models/user.model.js'
import ContributionAccount from '../models/contribution.model.js'
import Wallet from '../models/walletBalance.mode.js';
import { getFirstThursdayAfter, addWeeks} from '../utils/firstThursday.js'
import { sendVerificationToken, verifyToken } from '../utils/termii.js';

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

        // if (!user.isActivated) {
        //     const error = new Error("Account not activated. Please complete activation first.");
        //     error.statusCode = 403;
        //     throw error;
        // }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        user.password = undefined

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: {
                token,
                user
            },
        });

    } catch (error) {
        next(error)
    }
}

const activateAccount = async (req, res, next) => {
  try {
        // 📌 Cloudinary proof check
        const registrationProofUrl = req.files?.registrationProof?.[0]?.path;
            if (!registrationProofUrl) {
            const error = new Error("Registration proof is required");
            error.statusCode = 400;
            throw error;
        }

        // 📌 User activation details
        const userId = req.user?.id;
        if (!userId) {
            const error = new Error("User Id is required");
            error.statusCode = 400;
            throw error;
        }

        const {
            sex,
            bankName,
            accountNumber,
            residentialAddress,
            nextOfKinName,
            nextOfKinPhone,
            nextOfKinAddress,
            referralCode,
        } = req.body;

        // 📌 Update user with activation form details
        const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
            sex,
            bankName,
            accountNumber,
            residentialAddress,
            registrationProofUrl,
            isActivated: true, 
            nextOfKin: {
            name: nextOfKinName,
            phone: nextOfKinPhone,
            address: nextOfKinAddress,
            },
            activatedAt: new Date(),
        },
        { new: true }
        );

        if (!updatedUser) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        // 📌 Validate referral code if provided
        let referredBy = null;
        if (referralCode) {
        const refAcc = await ContributionAccount.findOne({ referralCode });
        if (!refAcc) {
            const error = new Error("Invalid referral code");
            error.statusCode = 400;
            throw error;
        }
        referredBy = refAcc._id;
        }

        // 📌 Create contribution account
        const newReferralCode = await generateReferralCode();
        const code = await generateConCode(userId);

        const firstThursday = getFirstThursdayAfter(); // finds the next Thursday from today
        const dueDate = addWeeks(firstThursday, 30);
        const dueDatePlusOneWeek = addWeeks(dueDate, 1);

        const newContribution = await ContributionAccount.create({
        userId: updatedUser._id,
        referralCode: newReferralCode,
        code,
        isPrimary: true,
        referredBy,
        firstThursday,
        dueDate,
        dueDatePlusOneWeek,
        status: "active",
        });

        //create wallet
        let wallet = await Wallet.findOne({ userId: updatedUser._id });
        if (!wallet) {
        wallet = await Wallet.create({
            userId: updatedUser._id,
            balance: 0,
        });
        }   

        res.status(200).json({
        success: true,
        message: "Account activated and primary contribution account created",
        data: {
            user: updatedUser,
            contribution: newContribution,
            wallet
        },
        });
    } catch (error) {
    next(error);
  }
};


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

const changePassword = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Old password and new password are required",
      });
    }

    // ✅ Strong password validation (regex)
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character",
      });
    }

    // Get user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Validate old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Old password is incorrect",
      });
    }

    // Hash new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Save new password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
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
    updateProfile,
    changePassword
}
