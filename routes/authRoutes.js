const express = require('express');
const router = express.Router();
const {   registerUser,
    verifyOtp,
    loginUser,
    updatePassword,
    updatePasswordOtp } = require('../controllers/authController');

// Register user
router.post('/registerUser', registerUser); // api/auth/registerUser

// Register user
router.post('/verifyOtp', verifyOtp); // api/auth/verifyOtp

router.post('/loginUser', loginUser); // api/auth/loginUser

router.post('/updatePassword', updatePassword); // api/auth/updatePassword

router.post('/updatePasswordOtp', updatePasswordOtp); // api/auth/updatePasswordOtp


module.exports = router;
