const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const nodemailer = require('nodemailer');

// Setup Brevo SMTP Transport
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // 1. Save message to MongoDB
    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    // 2. Send email to you (Sagar)
    const mailOptions = {
      from: process.env.MAIL_USER,
      to: 'sagar.y.praveen@gmail.com', // ✅ Your email
      subject: `New Portfolio Message from ${name}`,
      html: `
        <h2>You've received a new message!</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('❌ Email send error:', error);
        return res.status(500).json({ success: false, message: 'Email failed to send.' });
      } else {
        console.log('✅ Email sent:', info.response);
        return res.status(200).json({ success: true, message: 'Message sent successfully!' });
      }
    });

  } catch (err) {
    console.error('❌ Server error:', err);
    res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
});

module.exports = router;
