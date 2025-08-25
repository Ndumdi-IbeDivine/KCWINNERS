import ContributionAccount from "../models/contribution.model.js";
import User from "../models/user.model.js";
import Transaction from "../models/transaction.model.js";
import WalletFund from "../models/walletFunding.model.js";
import generateConCode from "../config/generateConCode.js";
import generateReferralCode from "../config/generateReferralCode.js";
import { getFirstThursdayAfter, addWeeks } from "../config/firstThursday.js";


const addContributionAcount = async (req, res, next) => {
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
        const referralCodeUnique = await generateReferralCode();  
        newAccounts.push({
            userId,
            code,
            referralCodeUnique,
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

const clearDefaults = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const acc = await ContributionAccount.findOne({ userId, status: "active" });
        if (!acc) return res.status(404).json({ success: false, message: "No active contribution account" });

        if (acc.missedWeeks === 0) {
        return res.status(400).json({ success: false, message: "No defaults to clear" });
        }

        const clearanceAmount = acc.missedWeeks * 2000 * 2;
        const wallet = await WalletFund.findOne({ userId });

        if (wallet.balance < clearanceAmount) {
        return res.status(400).json({ success: false, message: "Insufficient wallet balance to clear defaults" });
        }

        wallet.balance -= clearanceAmount;
        acc.missedWeeks = 0;
        acc.clearedDefaults = true;

        await wallet.save();
        await acc.save();

        await Transaction.create({
        userId,
        contributionAccountId: acc._id,
        type: "default_clearance",
        amount: clearanceAmount,
        status: "success",
        });

        res.status(200).json({ success: true, message: "Defaults cleared successfully" });
    } catch (err) {
        next(err);
    }
};

const payClearanceFee = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const acc = await ContributionAccount.findOne({ userId, status: "eligible_for_withdrawal" });
        if (!acc) return res.status(404).json({ success: false, message: "Not eligible for clearance" });

        const wallet = await WalletFund.findOne({ userId });
        if (wallet.balance < 5000) {
        return res.status(400).json({ success: false, message: "Insufficient balance to pay clearance fee" });
        }

        wallet.balance -= 5000;
        acc.clearanceFeePaid = true;
        acc.status = "eligible_for_payout"; // To mark as ready for payout

        await wallet.save();
        await acc.save();

        await Transaction.create({
        userId,
        contributionAccountId: acc._id,
        type: "clearance",
        amount: 5000,
        status: "success",
        });

        res.status(200).json({ success: true, message: "Clearance fee paid successfully" });
    } catch (err) {
        next(err);
    }
};

export {
    addContributionAcount,
    getUserContributions,
    getOneContribution,
    clearDefaults,
    payClearanceFee
}