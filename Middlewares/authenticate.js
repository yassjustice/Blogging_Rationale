const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;  // Use secret from .env file

const authenticate = (req, res, next) => {
  const token = req.cookies.jwtToken;

  if (!token) {
    return res.status(403).json({ message: 'Access denied, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;  // Attach user information to the request object
    next();
  } catch (err) {
    return res.status(400).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authenticate;
