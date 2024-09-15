require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
  const { email, message } = req.body;

  // Validate input
  if (!email || !message) {
    return res.status(400).send({ message: 'Email and message are required.' });
  }

  // Create transporter using Gmail service
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER, // Your Gmail address from environment variables
      pass: process.env.GMAIL_PASS, // Your Gmail app password or normal password from environment variables
    },
  });

  // Mail options
  const mailOptions = {
    from: email, // The sender's email address
    to: 'r190478@rguktrkv.ac.in', // Recipient email address
    subject: `Contact Form Submission from ${email}`,
    text: message,
  };

  // Send mail
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error); // Improved error logging
      return res.status(500).send({ message: 'Failed to send email' });
    }
    console.log('Email sent:', info.response); // Log successful email sending
    res.status(200).send({ message: 'Email sent successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
