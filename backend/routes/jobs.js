const express = require('express');
const router = express.Router();
const { z } = require('zod');
const { Jobs, Applications } = require('../db');
const { isEmployer, isEmployee } = require('../middlewares/roleCheck');
const { authMiddleware } = require('../middlewares/auth');

router.get('/stats/jobs-count', async (req, res) => {
    try {
      const totalJobs = await Jobs.countDocuments();
      res.json({ totalJobs });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error fetching jobs count' });
    }
  });

const jobSchema = z.object({
    title: z.string(),
    company: z.string(),
    industry: z.string(),
    location: z.string(),
    salary: z.number(),
    skills: z.array(z.string())
});

router.post('/postJob', authMiddleware, isEmployer, async (req, res) => {
    const employerId = req.user._id; // This comes from the token
    const jobData = req.body;
    const { success } = jobSchema.safeParse(jobData)
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }
    const existingJob = await Jobs.findOne({
        title: jobData.title,
        company: jobData.company,
        location: jobData.location,
        createdBy: employerId
    });

    if (existingJob) {
        return res.status(409).json({ message: 'You already posted this job' });
    }

    const job = await Jobs.create({ ...jobData, createdBy: employerId });
    res.status(201).json({ message: 'Job created successfully', job });
});

router.get('/viewJobs', authMiddleware, isEmployee, async (req, res) => {
  try {
    const { salary, location } = req.query;

    const applications = await Applications.find({ employeeID: req.user._id }).select('jobID');
    const appliedJobIds = applications.map(app => app.jobID.toString());

    // Build dynamic query
    const query = {
      _id: { $nin: appliedJobIds }
    };

    if (salary) {
      query.salary = { $gte: parseInt(salary) }; // Show jobs with salary >= requested salary
    }

    if (location) {
      query.location = new RegExp(location, 'i'); // Case-insensitive partial match
    }

    const jobs = await Jobs.find(query)
    .populate('createdBy', 'image') // Only select needed fields
    .exec();
    res.json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

  

router.get('/jobsPosted', authMiddleware, isEmployer, async (req, res) => {
    const jobs = await Jobs.find({ createdBy: req.user._id })
    .populate('createdBy', 'image') // Only select needed fields
    .exec();
    res.json(jobs);
});

module.exports = router;