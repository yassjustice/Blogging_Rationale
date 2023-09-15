const express = require('express');
const logoutRouter = express.Router();
const bcrypt = require('bcrypt');
const axios = require('axios');


logoutRouter.get('/', (req, res) => {
    res.clearCookie('jwtToken'); // Assuming you named the cookie 'jwtToken'
    res.redirect('/login'); // Redirect to login page after logout
  });
  

module.exports = logoutRouter;