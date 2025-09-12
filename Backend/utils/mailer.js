import nodemailer from 'nodemailer'
import { HOSTINGER_EMAIL, HOSTINGER_PASS } from '../config/env.js'

const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",   // Hostinger SMTP
    port: 465,
    secure: true, // true for port 465, false for 587
    auth: {
        user: HOSTINGER_EMAIL, 
        pass: HOSTINGER_PASS, 
    },
});

export default transporter;