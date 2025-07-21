import WalletFund from "../models/walletFunding.model.js";
import User from '../models/user.model.js';
import Transaction from '../models/transaction.model.js'
import generateReference from "../config/generateReference.js";


const initiateTransfer = async (req, res, next) => {
    try {
        const{ userId, amount } = req.body;
        const reference = generateReference(userId);

        const newFunding = await WalletFund.create({
            userId,
            amount,
            reference,
            status: 'pending'
        })


        res.status(201).json({
            success: true,
            message: 'Use the details below to fund your wallet',
            data: {
                bankAccount: {
                name: 'KCWINNERS GLOBAL INDUSTRIALS LIMITED',
                number: '0123456789',
                bank: 'Fidelity Bank'
                },
                amount: newFunding.amount, 
                reference: newFunding.reference
            }
        });

    } catch (error) {
        next(error)
    }
}

//Webhook controller
const handleIncomingTransfer = async (req, res, next) => {
    try {
       const { reference, narration } = req.body
       
       const funding = await WalletFund.findOne({ reference });

       if(!funding) {
        const error = new Error('Funding not found');
        error.status = 404;
        throw error;
       };

       if(funding.status === 'completed') {
        return res.status(200).json({
            success: true,
            message: 'Already Processed'
        })
       }

       funding.status = 'completed';
       funding.save();

       //To fund user wallet
        const user = await User.findByIdAndUpdate(funding.userId);
        user.walletBalance += funding.amount;
        await user.save();

        console.log(funding);

        res.status(200).json({ 
            success: true, 
            message: 'Wallet funded successfully' 
        });

        await Transaction.create({
            userId: funding.userId,
            type: 'wallet_funding',
            amount: funding.amount,
            reference: funding.reference,
            status: 'success',
            narration: narration || 'Wallet funding via manual transfer',
        });

    } catch (error) {
        next(error)
    }
}

export {
    initiateTransfer,
    handleIncomingTransfer
}