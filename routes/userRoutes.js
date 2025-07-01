const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const upload = require('../middleware/upload');
const { authorizeRole } = require('../middleware/roleMiddleware');
const { verifyToken } = require('../middleware/authMiddleware');


// List users (admin only)
router.get('/users', verifyToken, authorizeRole(['admin']), userController.getUsers);

// List users (admin only)
router.get('/users', verifyToken, authorizeRole(['admin']), userController.getUsersByFilter);

// POST user (admin only)
router.post('/user', verifyToken, authorizeRole(['admin']), upload.single('profileImage'), userController.createUser);

// Update user (maybe user themselves or admin — up to you)
router.put('/user/:id', verifyToken, upload.single('profileImage'), userController.updateUser);

// Delete user (admin only)
router.delete('/user/:id', verifyToken, authorizeRole(['admin']), userController.deleteUser);


module.exports = router;
