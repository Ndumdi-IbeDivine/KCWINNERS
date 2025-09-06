import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import WalletFund from "../models/walletFunding.model.js";
// import User from '../models/user.model.js';
import Transaction from '../models/transaction.model.js'
import { SQUAD_SECRET_KEY, SQUAD_INITIATE_URL, SQUAD_VERIFY_URL } from "../config/env.js";
// import generateReference from "../config/generateReference.js";


const initiateFunding = async (req, res, next) => {
    try {
        const { amount, email, name } = req.body;
        const userId = req.user?._id; 
        const transaction_ref = uuidv4();

        const payload = {
            amount: amount * 100,
            email,
            currency: "NGN",
            initiate_type: "inline",
            transaction_ref,
            callback_url: "http://localhost:3000/api/v1/wallet/fund-verify",
            customer_name: name,
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


export {
    initiateFunding,
    verifyFunding,
    squadWebhook
}