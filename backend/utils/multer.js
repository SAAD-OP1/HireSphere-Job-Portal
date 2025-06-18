// utils/multer.js
// utils/multer.js (optional clean version)
const multer = require('multer');
const { imageStorage, resumeStorage } = require('./cloudinary');

const uploadImage = multer({ storage: imageStorage });
const uploadResume = multer({ storage: resumeStorage });

module.exports = { uploadImage, uploadResume };
