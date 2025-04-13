const express = require('express');
const router = express.Router();
const { z } = require('zod');
const jwt = require('jsonwebtoken');
const { Employer } = require('../db');
const { JWT_SECRET } = require('../config');
const { handleSignin } = require('../utils/auth');

const employerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string(),
    companyName: z.string(),
});

router.post('/signup', async (req, res) => {
    const body = req.body;
    const { success } = employerSchema.safeParse(body);
    if (!success) {
        return res.status(411).json({ message: 'Incorrect inputs' });
    }

    const existingUser = await Employer.findOne({ email: body.email });
    if (existingUser) {
        return res.status(411).json({ message: 'Email already taken' });
    }

    const employer = await Employer.create(body);
    const token = jwt.sign({ _id: employer._id, role: 'employer' }, JWT_SECRET);

    res.json({ message: 'Employer created successfully', token });
});

router.post('/signin', async (req, res) => {
    await handleSignin(req, res, Employer, 'employer');
});

module.exports = router;
