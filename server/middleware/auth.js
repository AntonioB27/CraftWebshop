const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

module.exports = function auth(req, res, next) {
  const authHeader = req.headers.Authorization || req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ message: 'Authorization token missing' });

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7, authHeader.length)
    : authHeader;
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, isAdmin: !!decoded.isAdmin };
    next();
  } catch (err) {
    console.error('[auth] jwt verify error:', err.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
