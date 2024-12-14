const express = require('express');
const router = express.Router();
const { createOrder,
    verifyPayment,
    paymentSuccess,
} = require('../controllers/donationController')


// Route to handle order creation
router.post('/createOrder', createOrder);   //BaseUrl/api/donations/create-order

// Route to handle payment verification
router.post('/verifyPayment',verifyPayment);  //http://localhost:3000/api/donations/create-order


router.post('/paymentSuccess',paymentSuccess);  //http://localhost:3000/api/donations/payment-success

module.exports = router;