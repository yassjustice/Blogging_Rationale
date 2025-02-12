const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/user');  // MongoDB model for user
const secret = process.env.JWT_SECRET;  // Use secret from .env file

const RegisterRouter = express.Router();

// User registration
RegisterRouter.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  // Check if the user already exists in the database
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'Email already taken' });
  }

  // Hash password
  bcrypt.hash(password, 10, async (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ message: 'Error hashing password' });
    }

    // Save user to MongoDB
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // Generate JWT
    const token = jwt.sign({ userId: newUser._id, name: newUser.name }, secret, { expiresIn: '1h' });

    // Send token as cookie
    res.cookie('jwtToken', token, { httpOnly: true, maxAge: 3600000 });
    res.status(201).json({ message: 'User registered successfully' });
  });
});

module.exports = RegisterRouter;
