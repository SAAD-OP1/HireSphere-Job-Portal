const express = require('express');
const router = express.Router();
const multer = require('multer');
const { z } = require('zod');
const jwt = require('jsonwebtoken');
const { Employee } = require('../db');
const { authMiddleware } = require('../middlewares/auth');
const { JWT_SECRET } = require('../config');
const { handleSignin } = require('../utils/auth');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // You can customize based on field if needed
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit: 5MB
  fileFilter: function (req, file, cb) {
    // Allow only specific mime types
    if (file.fieldname === 'resume') {
      if (file.mimetype === 'application/pdf') return cb(null, true);
      return cb(new Error('Only PDF files allowed for resumes'));
    }
    cb(null, true); // For images, allow all for now
  }
});

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

const profileUpdateSchema = z.object({
  introduction: z.string().max(1000).optional(),
  skills: z.array(z.string()).optional(),
  basicInfo: z.object({
    age: z.string().optional(),
    yearsOfExperience: z.string().optional(),
    phone: z.string().optional(),
    ctc: z.string().optional(),
    location: z.string().optional()
  }).optional(),
  experience: z.array(z.object({
    company: z.string(),
    role: z.string(),
    duration: z.string()
  })).optional()
});

router.patch('/update-profile', authMiddleware, upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'resume', maxCount: 1 }
]), async (req, res) => {
  try {
    // Extract files safely
    if (req.files) {
      if (req.files.image) {
        req.body.image = req.files.image[0].path;
      }
      if (req.files.resume) {
        req.body.resume = req.files.resume[0].path;
      }
    }

    // Your existing parsing & updating logic
    const validated = profileUpdateSchema.parse({
      ...req.body,
      skills: req.body.skills ? JSON.parse(req.body.skills) : undefined,
      experience: req.body.experience ? JSON.parse(req.body.experience) : undefined,
      basicInfo: req.body.basicInfo ? JSON.parse(req.body.basicInfo) : undefined
    });

    const update = { ...validated };
    if (req.body.image) update.image = req.body.image;
    if (req.body.resume) update.resume = req.body.resume;

    const updated = await Employee.findByIdAndUpdate(req.user._id, update, { new: true });
    res.json(updated);
  } catch (err) {
    console.error('Update profile error:', err.message);
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;

