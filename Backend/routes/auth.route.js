import express from 'express';
import upload from '../middlewares/upload.middleware.js'
import { authorize } from '../middlewares/auth.middleware.js';
import { signUp, login, activateAccount } from '../controllers/auth.controller.js'

const router = express.Router();

router.use(authorize);

router.post('/sign-up', signUp);
router.post('/login', login);
router.post('/activate', upload.fields([{ name: 'registrationProof', maxCount: 1 }]), authorize, activateAccount);

export default router