import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/user.model.js'
import ContributionAccount from '../models/contribution.model.js'

import { JWT_EXPIRES_IN, JWT_SECRET } from '../config/env.js';

const signUp = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // logic to create a new user
        const { name, email, phone, password } = req.body;

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
        const newUsers = await User.create([{ name, email, phone, password: hashedPassword }], { session });

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

        const registrationProofUrl = req.files?.registrationProof?.[0]?.path;
        if(!registrationProofUrl) {
            const error = new Error('Registration proof is required');
            error.statusCode = 400;
            throw error;
        };

        const {
            userId,
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

        // generate primary contribution account
        const count = await ContributionAccount.countDocuments();
        const code = `CON${String(count + 1).padStart(4, '0')}`;

        const newContribution = await ContributionAccount.create({
            userId: updatedUser._id,
            code,
            isPrimary: true,
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

export {
    signUp, 
    login,
    activateAccount
}
