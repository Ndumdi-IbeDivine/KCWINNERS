import transporter from "../utils/mailer.js";
import { HOSTINGER_EMAIL, ADMIN_EMAIL } from "../config/env.js";

const sendContactForm = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !phone || !subject || !message) {
      const error = new Error("All fields are required");
      error.statusCode = 400;
      throw error;
    }

    const mailOptions = {
      from: `"KCWinners Contact Form" <${HOSTINGER_EMAIL}>`,
      to: [
        HOSTINGER_EMAIL, // Hostinger official email
        ADMIN_EMAIL,     // Normal personal/admin email
      ],
      replyTo: email, // so admin can just hit reply
      subject: `Contact Form: ${subject}`,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Subject: ${subject}
        Message: ${message}
      `,
      html: `
        <h2>📩 New Contact Form Message</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Subject:</b> ${subject}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    // Auto-reply email to user
    const autoReply = {
      from: `"KCWinners Support" <${HOSTINGER_EMAIL}>`,
      to: email,
      subject: "✅ We have received your message",
      html: `
        <h2>Hello ${name},</h2>
        <p>Thank you for contacting KCWinners. We have received your message and our team will get back to you shortly.</p>
        <p><b>Your Message:</b></p>
        <blockquote>${message}</blockquote>
        <p>Best Regards,</strong><br/>KCWinners Team</p>
      `,
    };

    await transporter.sendMail(autoReply);

    res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("❌ Contact Form Error:", error);
    next(error);
  }
};


export default sendContactForm;