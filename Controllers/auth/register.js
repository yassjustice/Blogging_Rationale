const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../Models/user');  // MongoDB model for user
const secret = process.env.JWT_SECRET;  // Use secret from .env file

const RegisterRouter = express.Router();

// User registration
RegisterRouter.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  // Validate input
  if (!name || !email || !password) {
    console.log('register failed');
    return res.render('layouts/index', {
      head: 'Register',  // Pass 'head' to be used in the view
      content: 'auth/register',  // Ensure that 'content' is set to 'auth/register'
      css: '/css/register.css',  // You can include the register-specific CSS
      error: 'Name, email, and password are required.'  // Pass the error
    });
  }

  try {
    // Check if the user already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
    console.log('register exist');
      return res.render('layouts/index', {
        head: 'Register',  // Pass 'head' to be used in the view
        content: 'auth/register',  // Ensure that 'content' is set to 'auth/register'
        css: '/css/register.css',  // Optional CSS for this view
        error: 'Email already taken.'  // Pass the error
      });
    }

    // Hash the password
    bcrypt.hash(password, 10, async (err, hashedPassword) => {
      if (err) {
    console.log('register error hash');
        return res.render('layouts/index', {
          head: 'Register',
          content: 'auth/register',
          css: '/css/register.css',
          error: 'Error hashing password.'  // Pass error on hashing failure
        });
      }

      // Save the user to MongoDB
      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();
      console.log('register saved');

      // Generate JWT token
      const token = jwt.sign({ userId: newUser._id, name: newUser.name }, secret, { expiresIn: '1h' });

      // Send token as cookie
      res.cookie('jwtToken', token, { httpOnly: true, maxAge: 3600000 }); // Token expires in 1 hour
      console.log('register redirecting soon');
      return res.redirect('/dashboard');  // Redirect to dashboard after successful registration
    });
  } catch (err) {
    console.log('Error registering user:');
    console.error('Error registering user:', err);
    return res.render('layouts/index', {
      head: 'Register',  // Ensure that 'head' is passed for consistency
      content: 'auth/register',  // The register page will be rendered
      css: '/css/register.css',  // Optional CSS for this view
      error: 'Internal server error. Please try again later.'  // General error message
    });
  }
});

module.exports = RegisterRouter;
