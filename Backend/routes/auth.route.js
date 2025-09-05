import express from 'express';
import upload from '../middlewares/upload.middleware.js'
import { authorize } from '../middlewares/auth.middleware.js';
import { signUp, login, activateAccount, forgotPassword, verifyOtp, resetPassword, updateProfile} from '../controllers/auth.controller.js'

const router = express.Router();

router.post('/sign-up', signUp);
router.post('/login', login);
router.post('/activate', upload.fields([{ name: 'registrationProof', maxCount: 1 }]), authorize, activateAccount);
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOtp);
router.post('/reset-password', resetPassword);
router.post('/update-profile', authorize, updateProfile);

export default router