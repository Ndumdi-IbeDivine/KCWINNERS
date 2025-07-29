import cron from 'node-cron'
import ContributionAccount from "../models/contribution.model.js";
import User from "../models/user.model.js";
import Transaction from "../models/transaction.model.js";

const WEEKLY_AMOUNT = 2000

cron.schedule('* * * * 4', async (req, res, next) => { 
    console.log('⏰ Cron tick', new Date().toLocaleTimeString());
    try {
        const contributions = await ContributionAccount.find();  // to find all contribution accounts
        const now = new Date();

        for (const account of contributions) {
            
            if (now < account.getFirstThursdayAfter) continue;

            if (now > account.dueDate) continue;

            const user = await User.findById(account.userId);
            if (!user) continue;

            if (user.walletBalance >= WEEKLY_AMOUNT) {

                // successful deduction
                user.walletBalance -= WEEKLY_AMOUNT;
                account.weeksPaid += 1;
                account.totalPaid += WEEKLY_AMOUNT;
                user.totalContributed += WEEKLY_AMOUNT;

                await Transaction.create({
                userId: user._id,
                contributionAccountId: account._id,
                type: 'weekly_contribution',
                amount: WEEKLY_AMOUNT,
                status: 'success',
                });
            } else {

                // default
                account.defaults += 1;

                await Transaction.create({
                userId: user._id,
                contributionAccountId: account._id,
                type: 'weekly_contribution',
                amount: 0,
                status: 'failed',
                });
            }

            await account.save();
            await user.save();
        }
        
        console.log('Weekly deduction run finished');
    } catch (error) {
        next(error)
    }
});

