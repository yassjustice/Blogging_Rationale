const express = require('express');
const addBrouter = express.Router();

addBrouter.get('/',(req, res) => {
    const head = 'All Blogs';
    res.render('addBlog', {head});
});


module.exports = addBrouter;