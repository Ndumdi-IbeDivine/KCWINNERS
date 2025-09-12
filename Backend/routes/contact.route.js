import express from 'express';
import sendContactForm from '../controllers/contact.controller.js';

const router = express.Router();

router.post('/', sendContactForm);

export default router;