import express from 'express';

import { addContributionAccount, getUserContributions, getOneContribution } from '../controllers/contribution.controller.js';


const router = express.Router();

router.post('/create', addContributionAccount);
router.get('/:userId', getUserContributions);
router.post('/detail/:id', getOneContribution);


export default router;