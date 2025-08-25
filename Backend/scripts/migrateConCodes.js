import mongoose from "mongoose";
import { MONGODB_URI } from "../config/env.js";
import ContributionAccount from "../models/contribution.model.js";
import User from "../models/user.model.js";
import { getFirstThursdayAfter, addWeeks } from "../config/firstThursday.js";

// Connect to Mongo
const MONGO_URI = MONGODB_URI;

// Helper: generate referral code
function generateReferralCode() {
  const random = Math.floor(100000 + Math.random() * 900000);
  return `REF${random}`;
}

async function migrate() {
  await mongoose.connect(MONGO_URI);
  console.log("✅ Connected to MongoDB");

  // 1. Update Users → role field
  const userResult = await User.updateMany(
    { role: { $exists: false } },
    { $set: { role: "user" } }
  );
  console.log(`✅ Updated ${userResult.modifiedCount} users with default role`);

  // 2. Update Contribution Accounts
  const accounts = await ContributionAccount.find({});
  console.log(`Found ${accounts.length} contribution accounts`);

  for (const acc of accounts) {
    let updated = false;

    // Ensure referralCode
    if (!acc.referralCode) {
      acc.referralCode = generateReferralCode();
      updated = true;
    }

    // Ensure dueDate
    if (!acc.dueDate) {
      const firstThursday = acc.firstThursday || getFirstThursdayAfter(acc.startDate);
      acc.firstThursday = firstThursday;
      acc.dueDate = addWeeks(firstThursday, 29); // 30 weeks cycle
      updated = true;
    }

    // Ensure dueDatePlusOneWeek
    if (!acc.dueDatePlusOneWeek) {
      if (acc.dueDate) {
        acc.dueDatePlusOneWeek = addWeeks(acc.dueDate, 1);
        updated = true;
      }
    }

    // Ensure status
    if (!acc.status) {
      acc.status = "active";
      updated = true;
    }

    // Ensure clearedDefaults
    if (acc.clearedDefaults === undefined) {
      acc.clearedDefaults = false;
      updated = true;
    }

    // Ensure clearanceFeePaid
    if (acc.clearanceFeePaid === undefined) {
      acc.clearanceFeePaid = false;
      updated = true;
    }

    if (updated) {
      await acc.save();
      console.log(`  • Updated contribution ${acc._id}`);
    }
  }

  console.log("✅ Migration complete");
  await mongoose.disconnect();
  process.exit(0);
}

migrate().catch((err) => {
  console.error("❌ Migration failed:", err);
  process.exit(1);
});