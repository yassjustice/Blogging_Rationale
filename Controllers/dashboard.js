const express = require('express');
const dashrouter = express.Router();

// Define route handlers (controllers) related to AllBlogs here
dashrouter.get('/',(req, res) => {
    const head = 'Dashboard';
    res.render('dashboard', {head});
});



module.exports = dashrouter;