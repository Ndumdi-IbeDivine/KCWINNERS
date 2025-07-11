import mongoose from 'mongoose';

const contributionSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    code: { 
        type: String, 
        unique: true 
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
    startDate: { 
        type: Date, 
        default: Date.now 
    },
    isPrimary: { 
        type: Boolean, 
        default: false 
    },
});

const ContributionAccount = mongoose.model('Contribution', contributionSchema);

export default ContributionAccount;