import express from 'express'; 
import { authorize, adminOnly } from '../middlewares/auth.middleware.js';
import { getPendingRegistrations, approveRegistration, getAllUsers, getClearedUsers, adminLogin, markAccountAsPaid } from '../controllers/admin.controller.js'

const router = express.Router();

router.post('/login', adminLogin);
router.get('/pending-registrations', authorize, adminOnly, getPendingRegistrations);
router.post('/approve-registration', authorize, adminOnly, approveRegistration);
router.get('/users', authorize, adminOnly, getAllUsers);
router.get('/cleared-users', authorize, adminOnly, getClearedUsers);
router.put('/account-paid', authorize, adminOnly, markAccountAsPaid);
router.get('/profile', authorize, adminOnly, async (req, res) => {
  try {
    // Here you can fetch statistics for admin (example)
    // E.g. total users, total contributions, etc.
    // For now, let's just return admin info.

    res.status(200).json({
      success: true,
      message: `Welcome Admin ${req.user.name}`,
      data: {
        email: req.user.email,
        role: req.user.role,

      },
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;