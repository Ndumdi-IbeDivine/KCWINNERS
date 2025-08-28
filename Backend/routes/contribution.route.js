import express from 'express';
import { authorize } from '../middlewares/auth.middleware.jsS'

import { addContributionAccount, getUserContributions, getOneContribution, payDefaults, payClearance } from '../controllers/contribution.controller.js'

const router = express.Router();
router.use(authorize);

router.post('/create', authorize, addContributionAccount);
router.get('/:userId', authorize, getUserContributions);
router.post('/detail/:id', authorize, getOneContribution);
router.post('/clear-defaults', authorize, payDefaults);
router.post('/pay-default', authorize, payClearance);


export default router;