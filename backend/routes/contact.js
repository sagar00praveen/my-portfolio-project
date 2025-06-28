const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Message = require('../models/Message');

router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Save to MongoDB (optional, but keeping your logic)
    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    // Create transporter using Brevo SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,       // smtp-relay.brevo.com
      port: process.env.MAIL_PORT,       // 587
      auth: {
        user: process.env.MAIL_USER,     // your Brevo email
        pass: process.env.MAIL_PASS      // your Brevo SMTP key
      }
    });

    // Email options
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.MAIL_USER}>`, // ✅ your verified Brevo email
      to: 'sagar.y.praveen@gmail.com',                         // ✅ your own email
      replyTo: email,                                          // ✅ visitor’s email (for reply)
      subject: 'New Contact Form Submission',
      html: `
        <h3>You've got a new message from your portfolio site:</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: 'Message sent and saved successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Something went wrong while sending the email.' });
  }
});

module.exports = router;
