// Login/app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/auth');
const app = express();

/* ===== Config ===== */
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const MONGO_URI = process.env.MONGO_URI;

/* ===== Middleware ===== */
app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(express.json({ limit: '1mb' }));

/* ===== DB Connect ===== */
if (!MONGO_URI) {
  console.error('Missing MONGO_URI in .env');
  process.exit(1);
}
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

/* ===== Test routes (tuỳ chọn) ===== */
app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.get('/api/greeting', (_req, res) => res.json({ message: 'Hello from backend API' }));

/* ===== Business routes ===== */
app.use('/api/auth', authRoutes);

/* ===== Redirect legacy HTML link -> SPA ===== */
app.get('/reset-password.html', (req, res) => {
  const q = req.originalUrl.includes('?')
    ? req.originalUrl.slice(req.originalUrl.indexOf('?'))
    : '';
  res.redirect(`${FRONTEND_URL}/reset-password${q}`);
});

/* ===== 404 & Error Handler ===== */
app.use((req, res) => res.status(404).json({ msg: 'Not found' }));
app.use((err, req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ msg: err?.message || 'Server error' });
});

module.exports = app; // ⚠️ export app, KHÔNG listen ở đây
