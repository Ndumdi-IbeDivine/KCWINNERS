import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    contributionAccountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ContributionAccount',
        default: null 
    },

    type: {
        type: String,
        enum: ['wallet_funding', 'weekly_contribution', 'account_creation_fee', 'default_clearance', 'clearance_fee'],
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    reference: {
        type: String,
        unique: true,
        sparse: true // allow nulls
    },

    status: {
        type: String,
        enum: ['pending', 'success', 'failed'],
        default: 'success'
    },

    narration: {
        type: String,
        default: ''
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;