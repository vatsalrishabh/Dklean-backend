const Razorpay = require('razorpay');
const { validateWebhookSignature } = require('razorpay/dist/utils/razorpay-utils');
const Donation = require('../models/Donation');
const { handleErrorWrapper } = require('../middleware/errorHandler');

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // Use environment variables
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Function to create an order
const createOrder = handleErrorWrapper(async (req, res) => {
    console.log("hit the api create order")
  const { amount, currency, receipt, notes } = req.body;

  // Check if receipt already exists
  const existingDonation = await Donation.findOne({ receipt });
  if (existingDonation) {
    return res.status(400).json({ error: 'Receipt ID already exists.' });
  }
  console.log("")
  const options = {
    amount: 200 * 100, // Convert amount to paise
    currency:'INR',
    receipt:{},
    notes:{},
  };

  const order = await razorpay.orders.create(options);

  // Save order details in database
  await Donation.create({
    donationAmount: amount,
    donorName: notes.donorName || 'Anonymous',
    donorEmail: notes.donorEmail || '',
    paymentStatus: 'pending',
    razorpayId: order.id,
    receipt,
  });

  res.json(order);
});

// Function to verify payment
const verifyPayment = handleErrorWrapper(async (req, res) => {
    console.log("git the api cerify")
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, payment_status } = req.body;

  const isValidSignature = validateWebhookSignature(
    `${razorpay_order_id}|${razorpay_payment_id}`,
    razorpay_signature,
    process.env.RAZORPAY_KEY_SECRET
  );

  if (!isValidSignature) {
    return res.status(400).json({ status: 'verification_failed' });
  }

  const donationRecord = await Donation.findOne({ razorpayId: razorpay_order_id });
  if (!donationRecord) {
    return res.status(404).json({ error: 'Donation record not found' });
  }

  // Update payment status
  const status = payment_status === 'failed' ? 'failed' : 'completed';
  await Donation.updateOne(
    { razorpayId: razorpay_order_id },
    {
      paymentStatus: status,
      transactionId: razorpay_payment_id,
    }
  );

  res.status(200).json({ status: 'ok', message: 'Payment verification successful' });
});

// Function to render payment success page
const paymentSuccess = (req, res) => {
    console.log("git the api sycess payment")
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Payment Success</title>
      <style>
        body { font-family: Arial, sans-serif; text-align: center; margin: 50px; }
        .success-message { color: green; font-size: 24px; margin-top: 20px; }
        .thank-you { font-size: 20px; }
      </style>
    </head>
    <body>
      <h1>Payment Successful!</h1>
      <p class="success-message">Thank you for your donation.</p>
      <p class="thank-you">Your transaction was completed successfully.</p>
    </body>
    </html>
  `);
};

// Export functions
module.exports = {
  createOrder,
  verifyPayment,
  paymentSuccess,
};
