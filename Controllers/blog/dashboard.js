const express = require('express');
const authenticate = require('../../Middlewares/authenticate');
const { getAllBlogs } = require('./allBlogs');  // Assuming this is your method for fetching blogs
const dashrouter = express.Router();

// Dashboard route
dashrouter.get('/', 
  authenticate, 
  async (req, res) => {
  const user = req.user;
  console.log("User : ",user);
  // Fetch user information and provide it to dashboard
  const head = 'Dashboard';
  try {
    const blogs = await getAllBlogs();
    const userBlogs = blogs.filter(blog => blog.author === user.name);
    const totalUserBlogs = userBlogs.length;

    res.render('layouts/mainLayout', {
      data: {
        email: user.email ,
        name: user.name ,
        head,
        totalUserBlogs ,
        content : 'dashboard/index'
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching blogs for dashboard');
  }
});

module.exports = dashrouter;
