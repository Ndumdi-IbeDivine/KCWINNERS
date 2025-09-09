import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import mongoose from "mongoose";

import WalletFund from "../models/walletFunding.model.js";
import User from '../models/user.model.js';
import Transaction from '../models/transaction.model.js'
import { SQUAD_SECRET_KEY, SQUAD_INITIATE_URL, SQUAD_VERIFY_URL } from "../config/env.js";
// import generateReference from "../config/generateReference.js";


const initiateFunding = async (req, res, next) => {
    try {
        const { amount } = req.body;
        const userId = req.user?._id; 
        const transaction_ref = uuidv4();

        const user = await User.findById(userId);
        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        const payload = {
            amount: amount * 100,
            email: user.email,
            currency: "NGN",
            initiate_type: "inline",
            transaction_ref,
            callback_url: "http://localhost:3000/api/v1/wallet/fund-verify",
            customer_name: user.name,
        };

        // Create a pending transaction record
        await Transaction.create({
            userId,
            type: "wallet_funding",
            amount,
            reference: transaction_ref,
            status: "pending",
        });

        const response = await axios.post(SQUAD_INITIATE_URL, payload, {
        headers: {
            Authorization: `Bearer ${SQUAD_SECRET_KEY}`,
            "Content-Type": "application/json",
        },
        });

        res.json({
            success: true,
            checkoutUrl: response.data?.data?.checkout_url,
            reference: transaction_ref,
        });
    } catch (error) {
        console.error(error.response?.data || error.message);
        next(error);
    }
};


const verifyFunding = async (req, res, next) => {
  try {
        const { reference } = req.query;

        const response = await axios.get(`${SQUAD_VERIFY_URL}/${reference}`, {
        headers: {
            Authorization: `Bearer ${SQUAD_SECRET_KEY}`,
        },
        });

        const data = response.data?.data;

        if (data?.status === "success") {
        // Find transaction by ref
        const transaction = await Transaction.findOne({ reference });
        if (!transaction) {
            return res.status(404).json({ success: false, message: "Transaction not found" });
        }

        // Update wallet balance
        await WalletFund.updateOne(
            { userId: transaction.userId },
            { $inc: { balance: data.amount / 100 } }
        );

        // Mark transaction success
        transaction.status = "success";
        await transaction.save();

        return res.json({ success: true, message: "Wallet funded successfully" });
        } else {
        // If failed, mark transaction failed
            await Transaction.findOneAndUpdate(
                { reference },
                { status: "failed" }
            );

            return res.status(400).json({ success: false, message: "Payment failed" });
        }
    } catch (error) {
    console.error(error.response?.data || error.message);
    next(error);
  }
};


const squadWebhook = async (req, res, next) => {
  try {
    const event = req.body;

    if (event.event === "transaction.success") {
      const userId = event.data.metadata.userId;
      const amount = event.data.amount / 100;

      await WalletFund.updateOne({ userId }, { $inc: { balance: amount } });
    }

    res.sendStatus(200); // acknowledge receipt
  } catch (error) {
    next(error);
  }
};


const getUserTransactions = async (req, res, next) => {
  try {
    const userId= req.user._id;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page-1) * 0;

    const [transactions, total] = await Promise.all([
        Transaction.find({ userId})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
        Transaction.countDocuments({ userId })
    ])
    
    res.status(200).json({
        success: true,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalTransactions: total,
        count: transactions.length,
        transactions,
    });
  } catch (error) {
    next(error);
  }
};

//get user revenue
const getUserRevenue = async (req, res, next) => {
    try {
        const userId = req.user?._id;
        const { ObjectId } = mongoose.Types;

        if (!ObjectId.isValid(userId)) {
        const error = new Error("Invalid userId");
        error.statusCode = 400;
        throw error;
        }

        const revenueData = await Transaction.aggregate([
        {
            $match: { 
            userId,
            status: "success",
            type: "weekly_contribution"
            }
        },
        {
            $group: {
            _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
            total: { $sum: "$amount" }
            }
        },
        {
            $sort: { "_id.year": 1, "_id.month": 1 }
        }
        ]);

        // Format for frontend graph
        const formatted = revenueData.map(item => ({
        month: `${item._id.month}-${item._id.year}`,
        total: item.total
        }));

        res.json({
        success: true,
        data: formatted
        });
    } catch (error) {
        next(error);
    }
};

export {
    initiateFunding,
    verifyFunding,
    squadWebhook,
    getUserTransactions,
    getUserRevenue
}