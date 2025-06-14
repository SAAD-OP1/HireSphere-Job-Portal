const express = require('express');
const app = express();
const router = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');
const { MONGO_URL } = require('./config'); 
const path = require('path');

app.use(cors());
app.use(express.json());
const uploadsPath = path.join(__dirname, '../uploads');  // adjust if necessary
app.use('/uploads', express.static(uploadsPath));
app.use('/api', router);

mongoose.connect(MONGO_URL)
    .then(() => console.log('Connected to DB'))
    .catch(err => console.error(err));

app.listen(3000, () => console.log('Server started on port 3000'));
