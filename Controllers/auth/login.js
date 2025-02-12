const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/user');  // MongoDB model for user
const secret = process.env.JWT_SECRET;  // Use secret from .env file

const loginRouter = express.Router();

// User login
loginRouter.post('/', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  // Find user by email in MongoDB
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Email not found' });
  }

  // Compare password with hashed password in the database
  bcrypt.compare(password, user.password, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (!result) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, name: user.name }, secret, { expiresIn: '1h' });

    // Send token as a cookie
    res.cookie('jwtToken', token, { httpOnly: true, maxAge: 3600000 });
    res.status(200).json({ message: 'Login successful' });
  });
});

module.exports = loginRouter;
