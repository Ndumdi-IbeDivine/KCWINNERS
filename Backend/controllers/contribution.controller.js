import ContributionAccount from "../models/contribution.model.js";
import User from "../models/user.model.js";
import Transaction from "../models/transaction.model.js";
import WalletFund from "../models/walletFunding.model.js";
import generateConCode from "../utils/generateConCode.js";
import generateReferralCode from "../utils/generateReferralCode.js";
import { getFirstThursdayAfter, addWeeks } from "../utils/firstThursday.js";


const addContributionAccount = async (req, res, next) => {
    try {
        const userId = req.user._id
        const { referralCode } = req.body;

        if (!userId || !referralCode) {
            const error = new Error("userId and referralCode are required");
            error.statusCode = 400;
            throw error;
        }

        // Verify user exists
            const user = await User.findById(userId);
            if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        // Check referral code validity
            const refAcc = await ContributionAccount.findOne({ referralCode });
            if (!refAcc) {
            const error = new Error("Invalid referral code");
            error.statusCode = 400;
            throw error;
        }

        // Check wallet balance (₦3000 required)
            const fee = 3000;
            if (user.walletBalance < fee) {
            const err = new Error(`Insufficient wallet balance. Need ₦${fee}`);
            err.statusCode = 402;
            throw err;
        }

        // Calculate dates
        const now = new Date();
        const firstThu = getFirstThursdayAfter(now);
        const due = addWeeks(firstThu, 29); // 30 weeks total
        const afterOneWeek = addWeeks(due, 1);

        // Generate codes
        const code = await generateConCode(userId);
        const referralCodeUnique = await generateReferralCode();

        // Create account (with referredBy linkage)
        const newAccount = await ContributionAccount.create({
            userId,
            code,
            referralCode: referralCodeUnique,
            referredBy: refAcc._id,
            startDate: now,
            firstThursday: firstThu,
            dueDate: due,
            dueDatePlusOneWeek: afterOneWeek,
            isPrimary: false,
        });

        // Deduct fee & log transaction
        user.walletBalance -= fee;
        await user.save();

        await Transaction.create({
            userId,
            type: "account_creation_fee",
            amount: fee,
            status: "success",
            narration: "Creation of contribution account",
        });

        // 🔑 Increment referral count on referrer’s account
        await ContributionAccount.findByIdAndUpdate(refAcc._id, {
            $inc: { referralCount: 1 },
        });

        // Send response
        res.status(201).json({
            success: true,
            message: "Contribution account created successfully",
            data: newAccount,
            walletBalance: user.walletBalance,
        });
    } catch (error) {
        next(error);
    }
};


const getUserContributions = async (req, res, next) => {
    try {
        const userId = req.user.id;

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

const payDefaults = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { accountId } = req.params; // Pass account explicitly

        const acc = await ContributionAccount.findOne({ _id: accountId, userId, status: "active" });
        if (!acc) {
            return res.status(404).json({ success: false, message: "Contribution account not found or inactive" });
        }

        if (acc.defaults === 0) {
        return res.status(400).json({ success: false, message: "No defaults to clear for this account" });
        }

        const clearanceAmount = acc.defaults * 2000 * 2; // double penalty
        const wallet = await WalletFund.findOne({ userId });
        if (!wallet) {
        return res.status(404).json({ success: false, message: "Wallet not found" });
        }

        if (wallet.balance < clearanceAmount) {
        return res.status(400).json({ success: false, message: "Insufficient wallet balance to clear defaults" });
        }

        // Deduct & update
        wallet.balance -= clearanceAmount;
        acc.defaults = 0;
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

        res.status(200).json({ 
        success: true, 
        message: "Defaults cleared successfully",
        newWalletBalance: wallet.balance 
        });
    } catch (error) {
        next(error);
    }
};

const payClearance = async (req, res, next) => {
    try {
        const userId = req.user._id; // use _id for consistency
        const { accountId } = req.params; // account ID comes from the URL

        const acc = await ContributionAccount.findOne({
        _id: accountId,
        userId,
        status: "completed"
        });

        if (!acc) {
        return res.status(400).json({ 
            success: false, 
            message: "Not eligible for clearance" 
        });
        }

        if (acc.defaults > 0) {
        return res.status(400).json({ 
            success: false, 
            message: "Clear defaults before paying clearance fee" 
        });
        }

        const wallet = await WalletFund.findOne({ userId });
        if (!wallet) {
        return res.status(404).json({ success: false, message: "Wallet not found" });
        }

        if (wallet.balance < 2000) {
        return res.status(400).json({ 
            success: false, 
            message: "Insufficient balance to pay clearance fee" 
        });
        }

        // Deduct from wallet
        wallet.balance -= 2000;

        // Mark account ready for payout
        acc.clearanceFeePaid = true;
        acc.status = "eligible_for_withdrawal";

        await wallet.save();
        await acc.save();

        // Log transaction
        await Transaction.create({
        userId,
        contributionAccountId: acc._id,
        type: "clearance",
        amount: 2000,
        status: "success",
        });

        console.log({
            accountId,
            userId,
            acc: await ContributionAccount.findOne({ _id: accountId })
        });

        res.status(200).json({ 
        success: true, 
        message: "Clearance fee paid successfully",
        newWalletBalance: wallet.balance,
        clearedAccount: acc._id
        });
    } catch (err) {
        next(err);
    }
};

export {
    addContributionAccount,
    getUserContributions,
    getOneContribution,
    payDefaults,
    payClearance
}