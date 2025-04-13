const express = require('express');
const router = express.Router();
const multer = require('multer');
const { z } = require('zod');
const jwt = require('jsonwebtoken');
const { Employee } = require('../db');
const { authMiddleware } = require('../middlewares/auth');
const upload = multer({ dest: 'uploads/' });
const { JWT_SECRET } = require('../config');
const { handleSignin } = require('../utils/auth');

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

const profileUpdateSchema = z.object({
    introduction: z.string().max(1000).optional(),
    skills: z.array(z.string()).optional()
});

router.patch('/update-profile', authMiddleware, upload.single('image'), async (req, res) => {
    try {
        const validated = profileUpdateSchema.parse({
            ...req.body,
            skills: req.body.skills ? JSON.parse(req.body.skills) : undefined
        });

        const update = { ...validated };
        if (req.file) update.image = req.file.path;

        const updated = await Employee.findByIdAndUpdate(req.user._id, update, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;

