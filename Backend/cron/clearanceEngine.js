import cron from "node-cron";
import ContributionAccount from "../models/contribution.model.js";

// Run once every day at midnight
cron.schedule("0 0 * * *", async () => {
    try {
        console.log("🔄 Checking for accounts eligible for withdrawal...");

        const accounts = await ContributionAccount.find({
        status: "active",
        clearedDefaults: true,       // must have cleared all defaults
        clearanceFeePaid: { $ne: true }, // not yet paid clearance
        });

        for (let acc of accounts) {
        // Check if cycle is complete (30 weeks, or based on endDate)
        const weeksContributed = acc.weeksPaid || 0;
        if (weeksContributed >= 30) {
            acc.status = "completed";
            await acc.save();
            console.log(`✅ Account ${acc._id} marked as completed`);
        }
        }
    } catch (err) {
        console.error("❌ Error running clearance cron:", err);
    }
});