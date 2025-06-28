const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const nodemailer = require('nodemailer');

// POST route to receive contact form data
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Save the message to MongoDB
    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    // Set up Nodemailer with Brevo SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: false, // true for port 465, false for 587
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

    // Email details
    const mailOptions = {
      from: `"${name}" <${email}>`, // sender name and email
      to: 'sagar.y.praveen@gmail.com', // your receiving email
      subject: 'New Contact Form Submission',
      text: `You received a new message from your portfolio contact form:\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}`
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Respond with success
    res.json({ success: true, message: 'Message sent and email delivered successfully!' });

  } catch (error) {
    console.error('Error in contact route:', error);
    res.status(500).json({ success: false, message: 'Something went wrong. Please try again later.' });
  }
});

module.exports = router;
