const express = require('express');
const router = express.Router();

const employeeRoutes = require('./employee');
const employerRoutes = require('./employer');
const jobRoutes = require('./jobs');
const applicationRoutes = require('./applications');

router.use('/employee', employeeRoutes);
router.use('/employer', employerRoutes);
router.use('/jobs', jobRoutes);
router.use('/applications', applicationRoutes);

module.exports = router;
