import express from 'express';
import upload from '../middlewares/upload.middleware.js'
import { authorize } from '../middlewares/auth.middleware.js';
import { signUp, login, activateAccount, forgotPassword, verifyOtp, resetPassword, updateProfile} from '../controllers/auth.controller.js'
import User from '../models/user.model.js';

const router = express.Router();

router.post('/sign-up', signUp);
router.post('/login', login);
router.post('/activate', upload.fields([{ name: 'registrationProof', maxCount: 1 }]), authorize, activateAccount);
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOtp);
router.post('/reset-password', resetPassword);
router.patch('/update-profile', authorize, updateProfile);
router.get('/check', authorize, async (req, res) => {
    try {
        console.log('res', req.user)
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'Unauthorized: User not found' })
        }

        let user = await User.findById(req.user._id)
        if (!user) {
            return res.status(401).json({ success: false, message: 'Unauthorized: User not found' })
        }

        const userData = user.toObject();
        delete userData.password;

        res.status(200).json({ success: true, message: 'User data retrieved successfully!', user: userData })
    } catch (err) {
        console.error('Error in /me route:', err)
        res.status(500).json({ success: false, message: 'Server error' })
    }
})

export default router