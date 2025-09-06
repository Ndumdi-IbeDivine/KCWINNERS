import express from 'express';
import { initiateFunding, verifyFunding, squadWebhook } from '../controllers/wallet.controller.js';

const router = express.Router();

router.post('/fund-initiate', initiateFunding);  //to fund wallet
router.get('/fund-verify', verifyFunding)
router.post('/webhook', squadWebhook);  //to integrate webhook for automatic wallet funded display

export default router;