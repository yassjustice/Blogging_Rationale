const express = require('express');
const allBrouter = express.Router();

// Define route handlers (controllers) related to AllBlogs here
allBrouter.get('/',(req, res) => {
    const head = 'All Blogs';
    res.render('allblogs', {head});
});


module.exports = allBrouter;