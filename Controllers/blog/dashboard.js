const express = require('express');
const authenticate = require('../Middlewares/authenticate');
const { getAllBlogs } = require('./blog/allBlogs');
const dashrouter = express.Router();

dashrouter.get('/', authenticate, async (req, res) => {
  const user = req.user;
  const head = 'Dashboard';
  try {
    const blogs = await getAllBlogs();
    const userBlogs = blogs.filter(blog => blog.author === user.name);
    const totalUserBlogs = userBlogs.length;

    res.render('dashboard', {
      data: {
        email: user.email,
        name: user.name,
        head,
        totalUserBlogs
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching blogs for dashboard');
  }
});

module.exports = dashrouter;
