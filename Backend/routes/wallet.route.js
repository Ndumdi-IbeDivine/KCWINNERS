import express from 'express';
import { initiateTransfer, handleIncomingTransfer } from '../controllers/wallet.controller.js';

const router = express.Router();

router.post('/transfer/initiate', initiateTransfer);  //to fund wallet
router.post('/webhook', handleIncomingTransfer);  //to integrate webhook for automatic wallet funded display

export default router;