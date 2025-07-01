const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];


  if (!token) {
    return res.status(403).json({ success: false, message: 'Token missing' });
  }

  try {
    const decoded = jwt.verify(token, 'formmaster_secret');
    req.userId = decoded.userId;
    req.role = decoded.role;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};
