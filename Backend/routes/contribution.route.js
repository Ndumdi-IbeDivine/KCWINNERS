import express from 'express';

import { addContributionAccount, getUserContributions, getOneContribution, payDefaults, payClearance } from '../controllers/contribution.controller.js'

const router = express.Router();

router.post('/create', addContributionAccount);
router.get('/:userId', getUserContributions);
router.post('/detail/:id', getOneContribution);
router.post('/clear-defaults', payDefaults);
router.post('/pay-default', payClearance);


export default router;