const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../Models/user');  // MongoDB model for user
const secret = process.env.JWT_SECRET;  // Use secret from .env file

const loginRouter = express.Router();

// User login
loginRouter.post('/', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    req.flash('error', 'Email and password are required.');
    console.log('error', 'Email and password are required.');
    return res.redirect('/login');
  }

  try {
    // Find user by email in MongoDB
    const user = await User.findOne({ email });
    if (!user) {
      req.flash('error', 'Email not found');
    console.log('error', 'Email not found');
      return res.redirect('/login');
    }

    // Compare password with hashed password in the database
    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      req.flash('error', 'Incorrect password');
    console.log('error', 'Incorrect password');
      return res.redirect('/login');
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, name: user.name }, secret, { expiresIn: '1h' });

    // Send token as a cookie
    res.cookie('jwtToken', token, { httpOnly: true, maxAge: 3600000 }); // Token expires in 1 hour
    console.log('Success', 'Login successful');
    // res.status(200).json({ message: 'Login successful' });
    return res.redirect('/dashboard'); // ✅ Only ONE response
  } catch (err) {
    console.error('Login error:', err);
    req.flash('error', 'Internal server error');
    console.log('error', 'Internal server error');
    return res.redirect('/login');
  }
});

module.exports = loginRouter;
