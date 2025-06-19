const express = require('express');
const router = express.Router();
const { z } = require('zod');
const jwt = require('jsonwebtoken');

const { Employer } = require('../db');
const { JWT_SECRET } = require('../config');
const { authMiddleware } = require('../middlewares/auth');
const { handleSignin } = require('../utils/auth');

const multer = require('multer');
const { imageStorage } = require('../utils/cloudinary');
const uploadImage = multer({ storage: imageStorage });

const employerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    companyName: z.string(),
    phoneNumber: z.string()
      .regex(/^\d{10}$/, { message: "Phone number must be exactly 10 digits" }),
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

router.get('/public/:id', async (req, res) => {
  try {
    const employer = await Employer.findById(req.params.id).select('-password');
    if (!employer) return res.status(404).json({ error: 'Employer not found' });
    res.json(employer);
  } catch (err) {
    console.error('Error fetching employer profile by ID:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
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

const updateSchema = z.object({
  description: z.string().max(1000).optional(),
  website: z.preprocess(
    (val) => (val === '' ? undefined : val),
    z.string().url().optional()
  ),
  location: z.string().optional(),
  industry: z.string().optional()
});

router.patch('/update-profile', authMiddleware, uploadImage.single('image'), async (req, res) => {
  try {
    const validated = updateSchema.parse(req.body);
    const update = { ...validated };

    if (req.file && req.file.path) {
      update.image = req.file.path;
    }

    const updated = await Employer.findByIdAndUpdate(req.user._id, update, { new: true });
    res.json(updated);
  } catch (err) {
    console.error('Error updating employer profile:', err);

    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: err.errors.map(e => e.message).join(', ') });
    }

    res.status(500).json({ error: err.message || 'Unexpected error' });
  }
});

module.exports = router;
