import mongoose from 'mongoose';

const contributionSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    code: { 
        type: String, 
        required: true 
    }, // e.g. CON0001
    totalPaid: { 
        type: Number, 
        default: 0 },
    weeksPaid: { 
        type: Number, 
        default: 0 
    },
    defaults: { 
        type: Number, 
        default: 0 
    },
    referralCode: { 
        type: String, 
        unique: true, 
        required: true
    },
    referredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ContributionAccount", // links to another contribution account
        required: false,            // optional for primary, required for secondary
    },
    startDate: { 
        type: Date, 
        default: Date.now 
    },
    firstThursday: { 
        type: Date, 
        required: true 
    },
    dueDate:  { 
        type: Date, 
        required: true 
    },
    dueDatePlusOneWeek: {
        type: Date,
        required: true
    },
    isPrimary: { 
        type: Boolean, 
        default: false 
    },
    status: {
        type: String,
        enum: ["active", "completed", "eligible_for_withdrawal"],
        default: "active",
    },
    clearedDefaults: {
        type: Boolean,
        default: false,
    },
    clearanceFeePaid: {
        type: Boolean,
        default: false,
    },
});

contributionSchema.index({ userId: 1, code: 1 }, { unique: true });

const ContributionAccount = mongoose.model('Contribution', contributionSchema);

export default ContributionAccount;