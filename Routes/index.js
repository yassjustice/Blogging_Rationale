const express = require('express');
const router = express.Router();
// const allBlogs = require('../Controllers/allblogs');
// const dashboard = require('../controllers/dashboard');
// const editBlog = require('../controllers/editblog');
// const login = require('../controllers/login');
// const register = require('../controllers/register');
const allBlogs = require('../Controllers/allBlogs');
const dashrouter = require('../Controllers/dashboard');
const editRouter = require('../Controllers/editBlog');
const loginRouter = require('../Controllers/login');
const RegisterRouter = require('../Controllers/register');
const blogRouter = require('../Controllers/blog');

// Define your routes here
// For example:
router.use('/allblogs', allBlogs);
router.use('/dashboard', dashrouter);
router.use('/editblog', editRouter);
router.use('/login', loginRouter);
router.use('/register', RegisterRouter);
// router.use( blogRouter);

// Create a new blog
router.post('/blogs', blogRouter.createBlog);

// Get a blog by ID
router.get('/blogs/:id', blogRouter.getBlog);

// Update a blog by ID
router.put('/blogs/:id', blogRouter.updateBlog);

// Delete a blog by ID
router.delete('/blogs/:id', blogRouter.deleteBlog);



module.exports = router;