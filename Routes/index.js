const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const auth = require('../Middlewares/authenticate');

// Controllers
const { getAllBlogs, getBlogById } = require('../Controllers/blog/allBlogs');
const { createBlog, updateBlog, deleteBlog } = require('../Controllers/blog/blog');
const dashboardRouter = require('../Controllers/blog/dashboard');
const loginRouter = require('../Controllers/auth/login');
const registerRouter = require('../Controllers/auth/register');
const logoutRouter = require('../Controllers/auth/logout');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.cloudinaryCloudName,
  api_key: process.env.cloudinaryApi_key,
  api_secret: process.env.cloudinaryApi_secret,
});

// Multer Storage (for Cloudinary Upload)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Helper function to upload image to Cloudinary
const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { resource_type: 'auto' },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result.url);
      }
    ).end(file.buffer);
  });
};

// Home Route (Landing Page)
router.get('/', async (req, res) => {
  try {
    // Home page with CTA and no blog display
    res.render('layouts/index', { 
      head: 'Welcome to BlogGenius', 
      content: 'home', 
      css: '/css/home.css' // Specific styling for the home page
    });
  } catch (err) {
    console.error('Error in home route:', err);
    res.status(500).render('error', { message: 'Error loading home page', error: err });
  }
});

// All Blogs Page (Display Blogs)
router.get('/allblogs', async (req, res) => {
  try {
    const blogs = await getAllBlogs();
    if (blogs.length === 0) {
      // Render a message if no blogs exist
      res.render('layouts/index', {
        head: 'All Blogs',
        content: 'blogs/no-blogs',
        css: '/css/allblogs.css'
      });
    } else {
      // Render the blogs if they exist
      res.render('layouts/index', {
        head: 'All Blogs',
        content: 'blogs/allblogs',
        blogs: blogs,
        css: '/css/allblogs.css'
      });
    }
  } catch (err) {
    console.error('Error fetching blogs:', err);
    res.status(500).render('error', { message: 'Error fetching blogs', error: err });
  }
});

// Add Blog (GET & POST)
router.get('/addblog', 
  auth,
 (req, res) => {
  res.render('layouts/index', { head: 'Add New Blog', content: 'blogs/add', css: '/css/addblog.css' });
});

router.post('/addblog', 
  auth, 
  upload.single('image'), async (req, res) => {
  try {
    let imageUrl = req.file ? await uploadToCloudinary(req.file) : null;
    await createBlog(req, res, imageUrl);
    res.redirect('/allblogs');
  } catch (err) {
    console.error('Error uploading file or creating blog:', err);
    res.status(500).render('error', { message: 'Error uploading file or creating blog', error: err });
  }
});

// Edit Blog (GET & POST)
router.get('/editblog/:id', 
  auth, 
  async (req, res) => {
  try {
    const blog = await getBlogById(req.params.id);
    if (!blog) return res.status(404).render('error', { message: 'Blog not found' });

    res.render('layouts/index', { 
      head: 'Edit Blog', 
      content: 'blogs/edit', 
      blog,
      css: '/css/editblog.css'  // Add custom styling for edit page
    });
  } catch (err) {
    console.error('Error fetching blog:', err);
    res.status(500).render('error', { message: 'Error fetching blog', error: err });
  }
});

router.post('/editblog/:id', 
  auth, 
  upload.single('image'), async (req, res) => {
  try {
    let imageUrl = req.body.existingImageUrl;
    if (req.file) {
      imageUrl = await uploadToCloudinary(req.file);
    }
    await updateBlog(req, res, imageUrl);
    res.redirect(`/blog/${req.params.id}`);
  } catch (err) {
    console.error('Error updating blog:', err);
    res.status(500).render('error', { message: 'Error updating blog', error: err });
  }
});

// Delete Blog
router.post('/delete/:id', 
  auth, 
  async (req, res) => {
  try {
    await deleteBlog(req, res);
    res.redirect('/allblogs');
  } catch (err) {
    console.error('Error deleting blog:', err);
    res.status(500).render('error', { message: 'Error deleting blog', error: err });
  }
});

// GET route to render login page
router.get('/login', (req, res) => {
    // Check if there's an error in the session or query parameters (for example, after an unsuccessful login attempt)
    const error = req.query.error || null;  // Get error from query string or session
    res.render('layouts/index', { 
      head: 'Login',
      content: 'auth/login',  // Render the login page from 'views/auth/login.ejs'
      css: '/css/login.css',  // Optionally, you can have a specific stylesheet for the login page
      error: error  // Pass the error to the view
    });
  });
  
  // POST route to handle login logic using the loginRouter
  router.use('/login', loginRouter);  // Routes the POST request to the loginController
  
  
// Register Route - GET method to display registration form with layout
router.get('/register', (req, res) => {
    const error = req.query.error || null;  // Get error from query string or session
    res.render('layouts/index', { 
      head: 'Register',
      content: 'auth/register', // This will load the register page inside the layout
      css: '/css/register.css', // Optional: Include specific CSS for register page
      error: error  // Pass the error to the view
    });
  });
  
  
// Register Route - Now using RegisterRouter from the controller
router.use('/register', registerRouter);
  
  // Logout Route
  // router.get('/logout', (req, res) => {
  //   // Clear session or token for logout
  //   req.session.destroy((err) => {
  //     if (err) {
  //       console.error('Error logging out:', err);
  //       return res.status(500).render('error', { message: 'Error during logout', error: err });
  //     }
  //     res.redirect('/login');  // Redirect to home after logout
  //   });
  // });

  // Dashboard Route
router.use('/logout', logoutRouter);
  

// Dashboard Route
router.use('/dashboard', 
  // auth, 
  dashboardRouter);

// module.exports = router;
export default router;
