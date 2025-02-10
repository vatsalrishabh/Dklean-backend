const mongoose = require('mongoose');
require('dotenv').config();

// Get the MongoDB URI from environment variables
<<<<<<< HEAD
// const uri = process.env.MONGO_URI;
const uri = "mongodb://mongo:wGZewZq7JmJlncte@195.250.30.251:27017/Dklean?tls=false&authSource=admin";
=======
const uri = process.env.MONGO_URI;
// const uri = "mongodb://localhost:27017/DKlean";
>>>>>>> 985234f0cc5a1ac2a08c053f533f8d0f5136ca73

// Connect to MongoDB
mongoose.connect(uri)
  .then(() => {
    console.log('Successfully connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB', err);
  });
