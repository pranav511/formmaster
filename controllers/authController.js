const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register user
exports.register = async (req, res) => {
  try {
    const { name, gender, department, countryId, stateId, address, password } = req.body;

    if (!name || !gender || !department || !countryId || !stateId || !address || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(`
      INSERT INTO users (name, gender, department, countryId, stateId, address, password)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, gender, department, countryId, stateId, address, hashedPassword]
    );

    res.status(201).json({ success: true, message: 'User registered', userId: result.insertId });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      return res.status(400).json({ success: false, message: 'Name and password are required' });
    }

    const [rows] = await db.query(`SELECT * FROM users WHERE name = ?`, [name]);

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, 'formmaster_secret', { expiresIn: '1h' });

    res.status(200).json({ success: true, token });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
