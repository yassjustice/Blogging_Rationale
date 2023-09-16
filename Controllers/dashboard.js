const express = require('express');
const authenticate = require('../Middlewares/authenticate');
const dashrouter = express.Router();

// Define route handlers (controllers) related to AllBlogs here
dashrouter.get('/', authenticate,(req, res) => {
    const user = req.user;
    const head = 'Dashboard';
    // console.log(user);
    
    const data = {
      email: user.email,
      name: user.name,
      head:head
    }
    
    res.render('dashboard', {data});
});



module.exports = dashrouter;