exports.authorizeRole = (roles) => {
  console.log(roles);
  return (req, res, next) => {
    console.log(req.role);
    if (!roles.includes(req.role)) {
      return res.status(403).json({ success: false, message: 'Access denied: insufficient permissions' });
    }
    next();
  };
};
