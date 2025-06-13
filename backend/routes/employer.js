const express = require('express');
const router = express.Router();
const { z } = require('zod');
const jwt = require('jsonwebtoken');
const { Employer } = require('../db');
const { JWT_SECRET } = require('../config');
const { authMiddleware } = require('../middlewares/auth');
const { handleSignin } = require('../utils/auth');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

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

router.get('/me', authMiddleware, async (req, res) => {
  try {
    const employer = await Employer.findById(req.user._id).select('-password');
    if (!employer) return res.status(404).json({ error: 'Employer not found' });
    res.json(employer);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PATCH update employer profile
const updateSchema = z.object({
  description: z.string().max(1000).optional(),
  website: z.string().url().optional().nullable(),
  location: z.string().optional(),
  industry: z.string().optional()
});

router.patch('/update-profile', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const validated = updateSchema.parse(req.body);
    const update = { ...validated };

    if (req.file) {
      update.image = req.file.path;
    }

    const updated = await Employer.findByIdAndUpdate(req.user._id, update, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
