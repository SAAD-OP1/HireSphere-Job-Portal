const nodemailer = require('nodemailer');
require('dotenv').config(); // load environment variables from .env

// Create reusable transporter object using SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail', // or use "smtp.mailgun.org", "smtp.ethereal.email", etc.
  auth: {
    user: process.env.EMAIL_USER, // your email address
    pass: process.env.EMAIL_PASS  // your app password (not your login password!)
  }
});

/**
 * Send application status update email
 * @param {string} to - Recipient email
 * @param {string} subject - Email subject
 * @param {string} text - Plain text message body
 */
const sendStatusUpdate = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: `"HireSphere" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text
    });
    console.log(`✅ Email sent to ${to}`);
  } catch (err) {
    console.error(`❌ Failed to send email to ${to}:`, err.message);
  }
};

module.exports = sendStatusUpdate;
