import express from 'express'; 
import { authorize, adminOnly } from '../middlewares/auth.middleware.js';
import { getPendingRegistrations, approveRegistration, getClearedUsers } from '../controllers/admin.controller.js'

const router = express.Router();

router.use(authorize);
router.use(adminOnly);

router.get('/pending-registrations', adminOnly, getPendingRegistrations);
router.get('/approve-registration', adminOnly, approveRegistration);
router.get('cleared-users', adminOnly, getClearedUsers)

export default router;