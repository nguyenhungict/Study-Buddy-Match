const passwordPolicy = (req, res, next) => {
    const { password } = req.body;
    if (password.length < 8) {
        return res.status(400).json({ msg: 'Password must be at least 8 characters long.' });
    }
    if (!/[A-Z]/.test(password)) {
        return res.status(400).json({ msg: 'Password must contain an uppercase letter.' });
    }
    if (!/[a-z]/.test(password)) {
        return res.status(400).json({ msg: 'Password must contain a lowercase letter.' });
    }
    if (!/\d/.test(password)) {
        return res.status(400).json({ msg: 'Password must contain a number.' });
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
        return res.status(400).json({ msg: 'Password must contain a special character.' });
    }
    next();
};

module.exports = { passwordPolicy };