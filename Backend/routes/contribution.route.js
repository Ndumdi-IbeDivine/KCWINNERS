import express from 'express';

import { createContribution, getUserContributions, getOneContribution } from '../controllers/contribution..controller.js';


const router = express.Router();

router.post('/create', createContribution);
router.get('/:userId', getUserContributions);
router.post('/detail/:id', getOneContribution);

export default router;