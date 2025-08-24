const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied.' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (e) {
        res.status(401).json({ msg: 'Token is not valid.' });
    }
};

const authorize = (role) => (req, res, next) => {
    if (req.user.role !== role) {
        return res.status(403).json({ msg: `Access denied. Requires ${role} role.` });
    }
    next();
};

const verifyEmail = (req, res, next) => {
    if (!req.user.emailVerified) {
        return res.status(403).json({ msg: 'Email not verified. Please check your email to verify.' });
    }
    next();
};

module.exports = { protect, authorize, verifyEmail };