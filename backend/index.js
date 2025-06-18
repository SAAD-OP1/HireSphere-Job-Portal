const express = require('express');
const app = express();
const router = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');
const { MONGO_URL } = require('./config'); 

app.use(cors());
app.use(express.json());
app.use('/api', router);

mongoose.connect(MONGO_URL)
  .then(() => {
    console.log('Connected to DB');
    app.listen(3000, () => console.log('Server started on port 3000'));
  })
  .catch(err => {
    console.log('Failed to connect to DB', err);
    process.exit(1); // optional: exit process if DB fails
  });
