import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/user.model.js'
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

// const activateAccount = async (req, res, next) => {

// }

export {
    signUp, 
    login
}
