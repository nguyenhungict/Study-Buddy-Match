const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { passwordPolicy } = require('../middleware/password');
const { protect, verifyEmail } = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Gửi email xác thực
const sendVerificationEmail = async (email, token) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Email Verification',
        html: `<p>Click <a href="http://localhost:5000/api/auth/verify-email?token=${token}">here</a> to verify your email.</p>`,
    };

    await transporter.sendMail(mailOptions);
};

// Gửi email đặt lại mật khẩu
const sendPasswordResetEmail = async (email, token) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    // Tạo URL đặt lại mật khẩu.
    // Lần này, nó sẽ chuyển hướng đến file HTML cục bộ
    const resetUrl = `http://localhost:5000/reset-password.html?token=${token}`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset Request',
        html: `<p>You requested a password reset. Please click the link below to reset your password:</p><a href="${resetUrl}">${resetUrl}</a>`,
    };

    await transporter.sendMail(mailOptions);
};

// Đăng ký tài khoản
router.post('/register', passwordPolicy, async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists.' });
        }
        user = new User({ email, password });
        await user.save();

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        await sendVerificationEmail(email, token);

        res.status(201).json({ msg: 'User registered. Please check your email to verify.' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Đăng nhập
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials.' });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials.' });
        }
        const payload = {
            user: {
                id: user.id,
                role: user.role,
                emailVerified: user.emailVerified,
            },
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m' });
        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Xác thực email
router.get('/verify-email', async (req, res) => {
    const { token } = req.query;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(400).json({ msg: 'Invalid token.' });
        }
        user.emailVerified = true;
        await user.save();
        res.json({ msg: 'Email verified successfully.' });
    } catch (err) {
        res.status(400).json({ msg: 'Invalid or expired token.' });
    }
});

// Đăng xuất (xóa token ở phía client)
router.post('/logout', (req, res) => {
    res.json({ msg: 'Logout successful.' });
});

// Route test - yêu cầu đăng nhập và email đã xác thực
router.get('/profile', protect, verifyEmail, (req, res) => {
    res.json({ msg: `Welcome, ${req.user.email}!` });
});

// Route GET mới để chuyển hướng đến trang đặt lại mật khẩu
router.get('/reset-password', (req, res) => {
    const { token } = req.query;
    if (!token) {
        return res.status(400).send('Missing token.');
    }
    // Chuyển hướng trình duyệt đến trang HTML và đính kèm token
    res.redirect(`http://localhost:5000/reset-password.html?token=${token}`);
});

///Forgot Password Functionality

// Route 1: Yêu cầu quên mật khẩu
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: 'User not found.' });
        }

        // Tạo token đặt lại mật khẩu ngẫu nhiên
        const resetToken = crypto.randomBytes(20).toString('hex');

        // Lưu token đã được mã hóa vào database để so sánh sau này
        user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        user.resetPasswordExpire = Date.now() + 3600000; // Token hết hạn sau 1 giờ

        await user.save();
        await sendPasswordResetEmail(email, resetToken);

        res.status(200).json({ msg: 'Password reset link sent to your email.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error.' });
    }
});

// Route 2: Đặt lại mật khẩu
router.post('/reset-password', passwordPolicy, async (req, res) => {
    const { token, newPassword } = req.body;

    // Mã hóa token từ client để so sánh với token trong database
    const resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');

    try {
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }, // $gt: kiểm tra token chưa hết hạn
        });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid or expired token.' });
        }

        // Cập nhật mật khẩu mới (nó sẽ được tự động hash khi lưu)
        user.password = newPassword;

        // Xóa token và thời gian hết hạn sau khi sử dụng
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();
        res.status(200).json({ msg: 'Password has been reset.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error.' });
    }
});

module.exports = router;