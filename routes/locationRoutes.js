const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

// Routes
router.get('/countries', locationController.getCountries);
router.get('/states', locationController.getStates);
router.get('/states/:countryId', locationController.getStatesByCountry);

module.exports = router;
