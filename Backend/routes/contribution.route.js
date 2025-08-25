import express from 'express';

import { addContributionAcount, getUserContributions, getOneContribution } from '../controllers/contribution.controller.js';


const router = express.Router();

router.post('/create', addContributionAcount);
router.get('/:userId', getUserContributions);
router.post('/detail/:id', getOneContribution);


export default router;