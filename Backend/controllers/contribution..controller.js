import ContributionAccount from "../models/contribution.model.js";
import User from "../models/user.model.js";
import Transaction from "../models/transaction.model.js";
import generateConCode from "../config/generateConCode.js";
import { getFirstThursdayAfter, addWeeks } from "../config/firstThursday.js";


const createContribution = async (req, res, next) => {
    try {
        
        const { userId, count = 1 } = req.body;
        const quantity = Number(count);

        if (!userId || quantity < 1) {
            const error = new Error('userId required');
            error.statusCode = 400;
            throw error;
        }

        const user = await User.findById(userId);
        const totalFee = 3000 * quantity;

        if (user.walletBalance < totalFee) {
        const err = new Error(`Insufficient wallet balance. Need ₦${totalFee}`);
        err.statusCode = 402;
        throw err;
        }

        const now = new Date();
        const firstThu = getFirstThursdayAfter(now);
        const due = addWeeks(firstThu, 29);           // 30 weeks total

        const newAccounts = [];

        for (let i = 0; i < quantity; i++) {
        const code = await generateConCode(userId);  
        newAccounts.push({
            userId,
            code,
            startDate: now,
            firstThursday: firstThu,
            dueDate: due,
            isPrimary: false,
        });
        }

        // 3. Save accounts in bulk
        const createdAccounts = await ContributionAccount.insertMany(newAccounts);

        // 4. Deduct fee & log transaction
        user.walletBalance -= totalFee;
        await user.save();

        await Transaction.create({
        userId,
        type: 'account_creation_fee',
        amount: totalFee,
        status: 'success',
        narration: `Creation of ${quantity} contribution account${quantity > 1 ? 's' : ''}`,
        });

        res.status(201).json({
        success: true,
        message: `${quantity} contribution account${quantity > 1 ? 's' : ''} created`,
        data: createdAccounts,
        walletBalance: user.walletBalance,
        });

  } catch (error) {
        next(error)
    }
}

const getUserContributions = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const list = await ContributionAccount.find({ userId }).sort({ startDate: 1 });

        res.status(200).json({ 
            success: true, 
            data: list 
        });
    } catch (error) {
        next(error)
    }
}

const getOneContribution = async (req, res, next) => {
    try {
        const contribution = await ContributionAccount.findById(req.params.id);

        if (!contribution) {
            const error = new Error('Contribution not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({ 
            success: true, 
            data: contribution 
        });

    } catch (error) {
        next(error)
    }
}

export {
    createContribution,
    getUserContributions,
    getOneContribution
}