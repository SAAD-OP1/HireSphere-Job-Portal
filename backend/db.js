const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://syedsaadsharief:Saad1234.@cluster0.ovkea9k.mongodb.net/HireSphereDB')

const employeeSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  phoneNumber: String,
  jobRole: String,
  image: {
    type: String,
    default: '',
  },
  experience: [
    {
      role: String,
      company: String,
      duration: String,
    }
  ],
  basicInfo: {
    age: { type: Number, default: null },
    highestQualification: { type: String, default: '' },
    location: { type: String, default: '' },
    },

  introduction: {
    type: String,
    default: '',
    maxlength: 1000
  },
  skills: {
    type: [String],
  },
  resume: {
    type: String,
    default: '',
  }
});

const employerSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    companyName: String
});

const jobSchema = new mongoose.Schema({
    title: String,
    company: String,
    industry: String,
    location: String,
    postingDate: {
        type: Date,
        default: Date.now,
    },
    openingsLeft: Number,
    skills: [String],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Employer' }  // New field
});


const applicationSchema = new mongoose.Schema({
    employeeID: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    jobID: { type: mongoose.Schema.Types.ObjectId, ref: 'Jobs' },
    coverLetter: String,
    status: { type: String, enum: ['Pending', 'Reviewed', 'Accepted', 'Rejected'], default: 'Pending' },
});

const Employee = mongoose.model('Employee', employeeSchema);
const Employer = mongoose.model('Employer', employerSchema);
const Applications = mongoose.model('Applications', applicationSchema);
const Jobs = mongoose.model('Jobs', jobSchema)

module.exports = {
	Employee,
    Employer,
    Jobs,
    Applications
};