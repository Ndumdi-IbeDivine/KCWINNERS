// import cron from 'node-cron'
// import ContributionAccount from "../models/contribution.model.js";
// import User from "../models/user.model.js";
// import Transaction from "../models/transaction.model.js";

// const CLEARANCE_FEE = 2000;

// // Run EVERYDAY at 10AM
// cron.schedule('0 10 * * *', async () => {
//   console.log('Clearance Cron tick', new Date().toLocaleString());

//   try {
//     const contributions = await ContributionAccount.find();
//     const now = new Date();

//     for (const account of contributions) {
//       // Clearance window = dueDate → dueDate + 7 days
//       const clearanceStart = new Date(account.dueDate);
//       const clearanceEnd = new Date(account.dueDate);
//       clearanceEnd.setDate(clearanceEnd.getDate() + 7);

//       // Only act inside clearance window
//       if (now < clearanceStart || now > clearanceEnd) continue;

//       const user = await User.findById(account.userId);
//       if (!user) continue;

//       // Skip if already cleared
//       if (account.cleared) {
//         console.log(`User ${user._id} already cleared`);
//         continue;
//       }

//       // Skip if user still has defaults
//       if (account.defaults > 0) {
//         console.log(`User ${user._id} skipped clearance due to defaults`);
//         continue;
//       }

//       if (user.walletBalance >= CLEARANCE_FEE) {
//         // Deduct clearance fee
//         user.walletBalance -= CLEARANCE_FEE;
//         account.cleared = true;
//         account.status = 'eligible_for_payout';

//         await Transaction.create({
//           userId: user._id,
//           contributionAccountId: account._id,
//           type: 'clearance',
//           amount: CLEARANCE_FEE,
//           status: 'success',
//         });

//         await account.save();
//         await user.save();

//         console.log(`✅ Clearance successful for user ${user._id}`);
//       } else {
//         // Instead of permanent failure, just log an attempt for tracking
//         await Transaction.create({
//           userId: user._id,
//           contributionAccountId: account._id,
//           type: 'clearance_attempt',
//           amount: 0,
//           status: 'pending',
//         });

//         console.log(`⏳ User ${user._id} has insufficient balance, will retry tomorrow`);
//       }
//     }

//     if (now > clearanceEnd && !account.cleared) {
//         account.status = 'clearance_failed';
//         await account.save();
//         console.log(`❌ User ${user._id} clearance permanently failed (7 days window passed)`);
//     }


//     console.log('Clearance Cron run finished');
//   } catch (error) {
//     console.error('❌ Clearance Cron error:', error);
//   }
// });