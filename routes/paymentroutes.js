const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/Payment/paymentController');

// Register route
router.get('/', paymentController.renderProduct);

// Login route
router.post('/createOrder', paymentController.createOrder);

module.exports = router;
