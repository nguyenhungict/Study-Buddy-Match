// backend/routes/auth.js
require('dotenv').config();

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const User = require('../models/user');
const { passwordPolicy } = require('../middleware/password');
const { protect, verifyEmail } = require('../middleware/auth');

/* ========= ENV URLs ========= */
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173'; // Vite dev
const BACKEND_URL  = process.env.BACKEND_URL  || 'http://localhost:5000'; // API

/* ========= Mail transporter (DRY) ========= */
const makeTransporter = () =>
  nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // dùng App Password khi deploy
    },
  });

/* ========= Email helpers ========= */
const sendVerificationEmail = async (email, token) => {
  const transporter = makeTransporter();
  const verifyLink = `${BACKEND_URL}/api/auth/verify-email?token=${encodeURIComponent(token)}`;
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Email Verification',
    html: `<p>Click <a href="${verifyLink}">here</a> to verify your email.</p>`,
  });
};

const sendPasswordResetEmail = async (email, token) => {
  const transporter = makeTransporter();
  // Link về SPA, KHÔNG còn .html
  const resetLink = `${FRONTEND_URL}/resetpass?token=${encodeURIComponent(token)}`;
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Reset Request',
    html: `<p>You requested a password reset.</p>
           <p>Click <a href="${resetLink}">this link</a> to set a new password. The link expires in 1 hour.</p>`,
  });
};

/* ========= Register ========= */
router.post('/register', passwordPolicy, async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists.' });

    user = new User({ email, password });
    await user.save();

    // token verify 1h
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    await sendVerificationEmail(email, token);

    res.status(201).json({ msg: 'User registered. Please check your email to verify.' });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).send('Server Error');
  }
});

/* ========= Login ========= */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials.' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials.' });

    const payload = {
      user: {
        id: user.id,
        role: user.role,
        emailVerified: user.emailVerified,
        email: user.email,
      },
    };
    // access token 15m
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m' });
    res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).send('Server Error');
  }
});

/* ========= Verify email ========= */
router.get('/verify-email', async (req, res) => {
  const { token } = req.query;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(400).json({ msg: 'Invalid token.' });

    user.emailVerified = true;
    await user.save();
    res.json({ msg: 'Email verified successfully.' });
  } catch (err) {
    console.error('Verify error:', err);
    res.status(400).json({ msg: 'Invalid or expired token.' });
  }
});

/* ========= Logout (client xoá token) ========= */
router.post('/logout', (_req, res) => res.json({ msg: 'Logout successful.' }));

/* ========= Protected sample ========= */
router.get('/profile', protect, verifyEmail, (req, res) => {
  res.json({ msg: `Welcome, ${req.user.email}!` });
});

/* ========= Forgot password ========= */
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: 'User not found.' });

    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpire = Date.now() + 3600000; // 1h
    await user.save();

    await sendPasswordResetEmail(email, resetToken);
    res.status(200).json({ msg: 'Password reset link sent to your email.' });
  } catch (err) {
    console.error('Forgot error:', err);
    res.status(500).json({ msg: 'Server error.' });
  }
});

/* ========= Reset password ========= */
router.post('/reset-password', passwordPolicy, async (req, res) => {
  const { token, newPassword } = req.body;
  const resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) return res.status(400).json({ msg: 'Invalid or expired token.' });

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({ msg: 'Password has been reset.' });
  } catch (err) {
    console.error('Reset error:', err);
    res.status(500).json({ msg: 'Server error.' });
  }
});

module.exports = router;
