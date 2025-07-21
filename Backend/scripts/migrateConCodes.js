// 1. ── setup ───────────────────────────────────────
import mongoose from 'mongoose';
import { MONGODB_URI } from '../config/env.js';
import { getFirstThursdayAfter, addWeeks } from '../config/firstThursday.js';

// change to your paths if different
import ContributionAccount from '../models/contribution.model.js';

const MONGO_URI = MONGODB_URI;

// 2. ── helper to zero‑pad numbers ─────────────────
const padCode = n => `CON${String(n).padStart(4, '0')}`;

// 3. ── migration runner ───────────────────────────
async function migrate() {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB\n');

    // FIRST: add firstThursday and dueDate to old contributions
    const outdated = await ContributionAccount.find({ firstThursday: { $exists: false } });
    for (const acc of outdated) {
        acc.firstThursday = getFirstThursdayAfter(acc.startDate);
        acc.dueDate = addWeeks(acc.firstThursday, 29); // 30 weeks including the first
        await acc.save();
    }
    console.log(`✅ Updated ${outdated.length} contributions with due dates\n`);

    // THEN: add codes like CON0001, CON0002 per user
    const userIds = await ContributionAccount.distinct('userId');

    for (const userId of userIds) {
        const accounts = await ContributionAccount
        .find({ userId })
        .sort({ startDate: 1 });          // oldest first

        console.log(`User ${userId} → ${accounts.length} accounts`);

        for (let i = 0; i < accounts.length; i++) {
        const desired = padCode(i + 1);    // CON0001, CON0002, ...
        if (accounts[i].code !== desired) {
            accounts[i].code = desired;
            await accounts[i].save();
            console.log(`  • updated ${accounts[i]._id} → ${desired}`);
        }
        }
    }

    console.log('\n✅ Migration complete');
    await mongoose.disconnect();
}

// 4. ── run & handle errors ────────────────────────
migrate().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
