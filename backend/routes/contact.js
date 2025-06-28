const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const nodemailer = require('nodemailer');

// Load environment variables
const {
  MAIL_HOST,
  MAIL_PORT,
  MAIL_USER,
  MAIL_PASS
} = process.env;

const transporter = nodemailer.createTransport({
  host: MAIL_HOST,
  port: MAIL_PORT,
  secure: false, // Brevo uses TLS over port 587
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Save message to MongoDB
    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    // Prepare email options
    const mailOptions = {
      from: `"Portfolio Contact" <${MAIL_USER}>`,  // ✅ Use your Brevo user as sender
      to: 'sagar.y.praveen@gmail.com',             // ✅ Your Gmail address to receive emails
      replyTo: email,                              // ✅ Allows you to reply to the sender
      subject: 'New Contact Form Submission',
      html: `
        <h3>You have a new message from your portfolio contact form:</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
});

module.exports = router;
