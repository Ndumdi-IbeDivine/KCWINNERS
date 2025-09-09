import mongoose from 'mongoose';

const walletFundSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    amount: { 
        type: Number, 
        required: true 
    },
    reference: { 
        type: String, 
        required: true, 
        unique: true 
    },
    balance: {
        type: Number,
        default: 0
    },
    status: { 
        type: String, 
        enum: ['pending', 'completed'], 
        default: 'pending' 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
})

const WalletFund = mongoose.model('WalletFund', walletFundSchema);

export default WalletFund;