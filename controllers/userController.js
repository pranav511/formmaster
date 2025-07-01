const bcrypt = require('bcryptjs');
const db = require('../config/db');

// Get all users with country & state names
exports.getUsers = async (req, res) => {
  try {
    const [users] = await db.query(`
      SELECT 
        u.id, u.name, u.gender, u.department, u.address, 
        u.profileImage, u.createdAt,u.role,
        c.name AS countryName,
        s.name AS stateName
      FROM users u
      JOIN countries c ON u.countryId = c.id
      JOIN states s ON u.stateId = s.id
    `);

    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create User (Admin API)
exports.createUser = async (req, res) => {    
  try {
    const { name, gender, department, countryId, stateId, address, password,role } = req.body;

    // Validate required fields
    if (!name || !gender || !department || !countryId || !stateId || !address || !password) {
      return res.status(400).json({ success: false, message: 'All fields including password are required' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Handle uploaded image if exists
    const profileImage = req.file ? req.file.filename : null;

    // Insert user into DB
    const [result] = await db.query(`
      INSERT INTO users (name, gender, department, countryId, stateId, address, profileImage, password,role)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)`,
      [name, gender, department, countryId, stateId, address, profileImage, hashedPassword,role]
    );

    res.status(201).json({ success: true, message: 'User created successfully', userId: result.insertId });

  } catch (error) {
    console.error('❌ Error creating user:', error);
    res.status(500).json({ success: false, message: 'Server error: ' + error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, gender, department, countryId, stateId, address, password } = req.body;

    // Validate required fields
    if (!name || !gender || !department || !countryId || !stateId || !address) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Handle uploaded image if exists
    const profileImage = req.file ? req.file.filename : null;

    // If password provided, hash it — else skip
    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Build query dynamically based on image/password presence
    let query = `UPDATE users SET name=?, gender=?, department=?, countryId=?, stateId=?, address=?`;
    let values = [name, gender, department, countryId, stateId, address];

    if (profileImage) {
      query += `, profileImage=?`;
      values.push(profileImage);
    }

    if (hashedPassword) {
      query += `, password=?`;
      values.push(hashedPassword);
    }

    query += ` WHERE id=?`;
    values.push(userId);

    // Execute update query
    const [result] = await db.query(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, message: 'User updated successfully' });

  } catch (error) {
    console.error('❌ Error updating user:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Delete user
    const [result] = await db.query(`DELETE FROM users WHERE id=?`, [userId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, message: 'User deleted successfully' });

  } catch (error) {
    console.error('❌ Error deleting user:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getUsersByFilter = async (req, res) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;

    const offset = (page - 1) * limit;

    let query = `
      SELECT id, name, department, createdAt
      FROM users
      WHERE 1=1
    `;

    let params = [];

    if (search) {
      query += ` AND name LIKE ?`;
      params.push(`%${search}%`);
    }

    query += ` LIMIT ? OFFSET ?`;
    params.push(parseInt(limit), parseInt(offset));

    const [users] = await db.query(query, params);

    res.json({ success: true, data: users });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};




