import express from 'express';
import { initiateFunding, verifyFunding, squadWebhook, getUserTransactions, getUserRevenue } from '../controllers/wallet.controller.js';
import { authorize } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/fund-initiate', authorize, initiateFunding); //to fund wallet
router.get('/fund-verify', verifyFunding) //To verify succesfull funding
router.post('/webhook', squadWebhook); //to integrate webhook for automatic wallet funded display
router.get('/transactions', authorize, getUserTransactions);
router.get('/revenue/monthly', authorize, getUserRevenue);

export default router;