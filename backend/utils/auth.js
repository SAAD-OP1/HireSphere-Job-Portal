const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

async function handleSignin(req, res, Model, role) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await Model.findOne({ email });

    if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ _id: user._id, role }, JWT_SECRET);
    res.json({ message: 'Signin successful', token });
}

module.exports = { handleSignin };
