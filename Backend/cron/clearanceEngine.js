import cron from 'node-cron'
import ContributionAccount from "../models/contribution.model.js";
import User from "../models/user.model.js";
import Transaction from "../models/transaction.model.js";

const CLEARANCE_FEE = 2000;

cron.schedule('0 2 * * 4', async () => {
    console.log('Clearance Cron tick', new Date().toLocaleString());

    try {
        const contributions = await ContributionAccount.find();
        const now = new Date();

        for (const account of contributions) {
        // only run on the 31st Thursday (one week after dueDate)
        if (now < account.dueDate) continue;
        if (now > account.dueDatePlusOneWeek) continue;  

        const user = await User.findById(account.userId);
        if (!user) continue;

        // skip if user still has uncleared defaults
        if (account.defaults > 0) {
            console.log(`User ${user._id} skipped clearance due to defaults`);
            continue;
        }

        if (user.walletBalance >= CLEARANCE_FEE) {
            //Deduct clearance fee
            user.walletBalance -= CLEARANCE_FEE;
            account.cleared = true;

            await Transaction.create({
            userId: user._id,
            contributionAccountId: account._id,
            type: 'clearance',
            amount: CLEARANCE_FEE,
            status: 'success',
            });

            // mark user eligible for payout
            account.status = 'eligible_for_payout';

            await account.save();
            await user.save();

            console.log(`Clearance successful for user ${user._id}`);

        } else {
            //Not enough balance
            await Transaction.create({
            userId: user._id,
            contributionAccountId: account._id,
            type: 'clearance',
            amount: 0,
            status: 'failed',
            });

            console.log(`User ${user._id} failed clearance (insufficient balance)`);
        }
        }

        console.log('Clearance Cron run finished');
    } catch (error) {
        console.error('Clearance Cron error:', error);
    }
})