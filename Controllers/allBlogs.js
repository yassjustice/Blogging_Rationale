const { default: axios } = require('axios');
const express = require('express');
const allBrouter = express.Router();

// Define route handlers (controllers) related to AllBlogs here
allBrouter.get('/', async (req, res) => {
    const head = 'All Blogs';
    const response = await axios.get("http://localhost:3000/blogs");
    const blogs = response.data;
    const data = {
        blogs:blogs,
        head:head
    }
    // console.log(data);
    res.render('allblogs', {data});
});


module.exports = allBrouter;