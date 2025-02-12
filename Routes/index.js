const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const auth = require('../Middlewares/authenticate');

// Controllers
const allBlogs = require('../Controllers/allBlogs');
const dashboardRouter = require('../Controllers/dashboard');
const editBlogRouter = require('../Controllers/editBlog');
const loginRouter = require('../Controllers/login');
const registerRouter = require('../Controllers/register');
const myBlogsRouter = require('../Controllers/myblogs');
const logoutRouter = require('../Controllers/logout');
const addBlogRouter = require('../Controllers/addblog');
const { createBlog, updateBlog, deleteBlog } = require('../Controllers/blog');

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.cloudinaryCloudName,
  api_key: process.env.cloudinaryApi_key,
  api_secret: process.env.cloudinaryApi_secret,
});

// Multer storage (using memoryStorage, as files are uploaded to Cloudinary directly)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to serve home page (Root) and render all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await allBlogs.getAllBlogs(); // Use getAllBlogs function
    res.render('allBlogs', { blogs }); // Render the 'allBlogs.ejs' view with blogs
  } catch (err) {
    console.error('Error fetching blogs', err);
    res.status(500).send('Error fetching blogs');
  }
});

// Other routes...
router.use('/allblogs', allBlogs);
router.use('/dashboard', auth, dashboardRouter);
router.use('/editblog', auth, editBlogRouter);
router.use('/login', loginRouter);
router.use('/register', registerRouter);
router.use('/logout', logoutRouter);
router.use('/addblog', auth, addBlogRouter);
router.use('/myblogs', auth, myBlogsRouter);

// Blog CRUD operations
router.post('/blogs', auth, upload.single('image'), async (req, res) => {
  try {
    if (req.file) {
      const result = await cloudinary.uploader.upload_stream({
        resource_type: 'auto',
      }, (error, result) => {
        if (error) {
          return res.status(500).send('Cloudinary upload error');
        }
        createBlog(req, res, result.url);
      });

      req.pipe(result);
    } else {
      createBlog(req, res, null);
    }
  } catch (err) {
    console.error('Error uploading file to Cloudinary', err);
    res.status(500).send('Error uploading file to Cloudinary');
  }
});

// Edit and delete operations remain the same as before...
router.post('/editblog/:id', auth, upload.single('image'), async (req, res) => {
  // Edit blog logic...
});

router.delete('/delete/:id', auth, deleteBlog);

module.exports = router;
