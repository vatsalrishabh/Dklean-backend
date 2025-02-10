const mongoose = require('mongoose');
require('dotenv').config();

// Get the MongoDB URI from environment variables
// const uri = process.env.MONGO_URI;
const uri = "mongodb://mongo:wGZewZq7JmJlncte@195.250.30.251:27017/Dklean?tls=false&authSource=admin";

// Connect to MongoDB
mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Successfully connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB', err);
  });