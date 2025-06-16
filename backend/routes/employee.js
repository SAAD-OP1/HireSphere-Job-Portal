const express = require('express');
const router = express.Router();
const { z } = require('zod');
const jwt = require('jsonwebtoken');
const multer = require('multer');

const { Employee } = require('../db');
const { JWT_SECRET } = require('../config');
const { authMiddleware } = require('../middlewares/auth');
const { handleSignin } = require('../utils/auth');
const { imageStorage, resumeStorage } = require('../utils/cloudinary'); // ✅ FIXED

const uploadImage = multer({ storage: imageStorage });
const uploadResume = multer({ storage: resumeStorage });

router.get('/stats/employees-count', async (req, res) => {
    try {
      const totalEmployees = await Employee.countDocuments();
      res.json({ totalEmployees });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error fetching employees count' });
    }
  });
  

const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string(),
    phoneNumber: z.string()
      .regex(/^\d{10}$/, { message: "Phone number must be exactly 10 digits" }),
    jobRole: z.string(),
  });
  

router.post('/signup', async (req, res) => {
    const body = req.body;
    const { success } = signupSchema.safeParse(body);
    if (!success) {
        return res.status(411).json({ message: 'Incorrect inputs' });
    }

    const existingUser = await Employee.findOne({ email: body.email });
    if (existingUser) {
        return res.status(411).json({ message: 'Email already taken' });
    }

    const employee = await Employee.create(body);
    const token = jwt.sign({ _id: employee._id, role: 'employee' }, JWT_SECRET);

    res.json({ message: 'Employee created successfully', token });
});

router.post('/signin', async (req, res) => {
    await handleSignin(req, res, Employee, 'employee');
});

router.get('/me', authMiddleware, async (req, res) => {
  try {
    const employee = await Employee.findById(req.user._id).select('-password'); // Don't return password
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(employee);
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/public/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id).select('-password');
    if (!employee) return res.status(404).json({ error: 'Employee not found' });
    res.json(employee);
  } catch (err) {
    console.error('Error fetching employee profile by ID:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const profileUpdateSchema = z.object({
  introduction: z.string().max(1000).optional(),
  skills: z.array(z.string()).optional(),
  basicInfo: z.object({
    age: z.number().optional().nullable(),
    highestQualification: z.string().optional().nullable(),
    location: z.string().optional().nullable()
  }).optional(),
  experience: z.array(z.object({
    role: z.string().min(1, "Role is required"),
    company: z.string().min(1, "Company is required"),
    duration: z.string().min(1, "Duration is required")
  })).optional()
});


router.patch('/update-profile', authMiddleware,
uploadImage.fields([
  { name: 'image', maxCount: 1 },
  { name: 'resume', maxCount: 1 },
]), async (req, res) => {
  try {
    if (req.files?.image) req.body.image = req.files.image[0].path;
    if (req.files?.resume) req.body.resume = req.files.resume[0].path;

    const validated = profileUpdateSchema.parse({
      ...req.body,
      skills: req.body.skills ? JSON.parse(req.body.skills) : undefined,
      experience: req.body.experience ? JSON.parse(req.body.experience) : undefined,
      basicInfo: req.body.basicInfo ? JSON.parse(req.body.basicInfo) : undefined
    });

    const update = { ...validated };
    if (req.files.image) {
        update.image = req.files.image[0].path;
      }

      if (req.files.resume) {
        update.resume = req.files.resume[0].path;
      }

    const updated = await Employee.findByIdAndUpdate(req.user._id, update, { new: true });
    res.json(updated);
  } catch (err) {
    console.error('Update profile error:', err);

    if (err.errors) {
      // Zod error
      const messages = err.errors.map(e => `${e.path.join('.')}: ${e.message}`);
      return res.status(400).json({ error: messages.join(', ') });
    }

    res.status(400).json({ error: err.message || 'Unexpected error' });
  }
});

module.exports = router;

