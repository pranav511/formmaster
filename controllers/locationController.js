const db = require('../config/db');

// GET all countries
exports.getCountries = async (req, res) => {
  try {
    const [countries] = await db.query('SELECT * FROM countries');
    res.status(200).json({ success: true, data: countries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET all states
exports.getStates = async (req, res) => {
  try {
    const [states] = await db.query('SELECT * FROM states');
    res.status(200).json({ success: true, data: states });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET states by countryId (for dependent dropdown)
exports.getStatesByCountry = async (req, res) => {
  const countryId = req.params.countryId;
  try {
    const [states] = await db.query('SELECT * FROM states WHERE countryId = ?', [countryId]);
    res.status(200).json({ success: true, data: states });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
