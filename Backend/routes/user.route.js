import express from 'express';

import { authorize } from '../middlewares/auth.middleware.js';
import { getUser } from '../controllers/user.controller.js'

const router = express.Router();


router.get('/:id', authorize, getUser);

export default router;