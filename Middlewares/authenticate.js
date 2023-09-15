// const express = require("express");
// const app = express()
const { name } = require('ejs');
const jwt = require('jsonwebtoken')
const secret = 'YassirHakimi'



function authenticate(req, res, next) {
    const token = req.cookies.jwtToken; // Assuming you named the cookie 'jwtToken'
    // console.log(token);
    if (!token) {
      return res.redirect('/login'); // Redirect to login if token is not present
    }
  
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.redirect('/login'); // Redirect to login if JWT is invalid
      }
  
      const { email, name, password } = decoded;
  
      req.user = { email, name, password };
      // req.user = decoded;
      console.log(decoded);
      console.log(email,name,password);
      next(); // Proceed to the dashboard route
    });
    
  }
  module.exports = authenticate;