// utils/cloudinary.js
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: 'duomt9kpq',   // your cloud name
  api_key: '868247328143572',   // replace with your actual key
  api_secret: 'RO39Z2HLBUMWr5H9Qzo3fC4HNlA',
});

const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'hiresphere/profiles',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    public_id: (req, file) => 'profile_' + Date.now(),
  },
});

const resumeStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'hiresphere/resumes',
    allowed_formats: ['pdf'],
    public_id: (req, file) => 'resume_' + Date.now(),
  },
});

module.exports = { cloudinary, imageStorage, resumeStorage };
