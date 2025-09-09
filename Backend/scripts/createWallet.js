import mongoose from "mongoose";
import { MONGODB_URI } from "../config/env.js";
import WalletFund from "../models/walletFunding.model.js";
import Transaction from "../models/transaction.model.js";
import User from "../models/user.model.js";


// Connect to Mongo
const MONGO_URI = MONGODB_URI;

const run = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to DB");

    const users = await User.find({ isActivated: true });

    for (const user of users) {
      const walletExists = await WalletFund.findOne({ user: user._id });
      if (!walletExists) {
        // Sum all verified contributions
        const totalContributions = await Transaction.aggregate([
          { $match: { userId: user._id, type: "contribution", status: "success" } },
          { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        const balance = totalContributions.length > 0 ? totalContributions[0].total : 0;

        await WalletFund.create({
          userId: user._id,
          reference: `MIGRATION_INIT_${user._id}`,
          amount: 0, // no new deposit
          balance,
      });

        console.log(`💰 Wallet created for ${user._id} with balance ₦${balance}`);
      }
    }

    console.log("🎉 Migration completed");
    process.exit(0);
  } catch (err) {
    console.error("❌ Migration failed:", err);
    process.exit(1);
  }
};

run();