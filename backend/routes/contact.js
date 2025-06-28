const express = require('express');
const router = express.Router();
const { Resend } = require('resend');
require('dotenv').config();

const resend = new Resend(process.env.RESEND_API_KEY);

router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev', // Must be a verified sender from Resend
      to: 'sagar.y.praveen@gmail.com', // Your inbox
      subject: 'New Contact Form Submission',
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong> ${message}</p>`
    });

    console.log('Email sent successfully:', data);
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send message. Please try again.' });
  }
});

module.exports = router;
