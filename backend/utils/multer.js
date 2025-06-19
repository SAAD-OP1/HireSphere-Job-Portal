// utils/multer.js
const multer = require('multer');
const { imageStorage } = require('./cloudinary');

const uploadImage = multer({ storage: imageStorage });

module.exports = { uploadImage };
