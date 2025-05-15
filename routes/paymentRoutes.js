const express = require('express');
const router = express.Router();
const { createOrder, verifyPayment, paymentSuccess, patientBookings, doctorBookings,adminBookings, sendMailToCx} = require('../controllers/paymentController');
const { authenticateJWT, authorizeRoles } = require('../middleware/rbacMiddleware')


// Route to handle order creation
router.post('/create-order', createOrder);   //BaseUrl/api/payments/razorpay/create-order

// Route to handle payment verification
router.post('/verify-payment',verifyPayment);  //http://localhost:3000/api/payments/create-order


router.post('/payment-success',paymentSuccess);  //http://localhost:3000/api/payments/payment-success

router.get('/patientBookings',patientBookings);  //http://localhost:3000/api/payments/patientBookings

// router.get('/doctorBookings',authenticateJWT,authorizeRoles('dcotor','admin'),doctorBookings);  //http://localhost:3000/api/payments/doctorBookings

router.get('/doctorBookings', doctorBookings);  //http://localhost:3000/api/payments/doctorBookings

router.get('/adminBookings',adminBookings);  //http://localhost:3000/api/payments/adminBookings

router.post('/sendMailToCx',sendMailToCx); //http://localhost:3000/api/payments/sendMailToCx

 

module.exports = router;

