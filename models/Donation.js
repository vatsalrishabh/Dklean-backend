const mongoose = require('mongoose');

// Define the donation schema
const donationSchema = new mongoose.Schema({
  donorName: {
    type: String,
    trim: true, // Ensures no extra spaces at the start or end
  },
  donorEmail: {
    type: String,
    unique: true, // Ensures no duplicate email addresses
    lowercase: true, // Converts the email to lowercase
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'], // Email validation
  },
  donationAmount: {
    type: Number,
    required: true,
    min: [1, 'Donation must be at least $1'], // Minimum donation amount validation
  },
  donationDate: {
    type: Date,
    default: Date.now, // Sets the current date by default
  },
  donationMessage: {
    type: String,
    trim: true, // Trims unnecessary spaces
    maxlength: 500, // Optional: Limits the donation message length
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'], // Defines valid payment statuses
    default: 'pending', // Default value
  },
 
  anonymous: {
    type: Boolean,
    default: false, // Default is false, meaning the donor is not anonymous
  },
  receiptSent: {
    type: Boolean,
    default: false, // If the receipt has been sent to the donor
  },
  razorpayId: {
    type: String,
    required: true, // Razorpay payment ID
    unique: true, // Ensures each donation has a unique Razorpay ID
  },
  userId:{type:String},
  transactionId: {
    type: String,
    required: true, // Razorpay transaction ID
    unique: true, // Ensures each transaction has a unique ID
  },
});

// Create the donation model using the schema
const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;
