const mongoose = require('mongoose');
require('dotenv').config();

// Get the MongoDB URI from environment variables
// const uri = process.env.MONGO_URI;
const uri = "mongodb://localhost:27017/DKlean";

// Connect to MongoDB
mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Successfully connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB', err);
  });