const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const auth = require('../Middlewares/authenticate');

// Controllers
const allBlogs = require('../Controllers/blog/allBlogs');
const dashboardRouter = require('../Controllers/blog/dashboard');
const editBlogRouter = require('../Controllers/blog/editBlog');
const loginRouter = require('../Controllers/login');
const registerRouter = require('../Controllers/auth/register');
const myBlogsRouter = require('../Controllers/blog/myblogs');
const logoutRouter = require('../Controllers/auth/logout');
const addBlogRouter = require('../Controllers/blog/addblog');
const { createBlog, updateBlog, deleteBlog } = require('../Controllers/blog/blog');

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
    const head = 'All Blogs'; // Optional heading or title for the page
    res.render('allblogs', { blogs, head }); // Render the 'allblogs.ejs' view with blogs
  } catch (err) {
    console.error('Error fetching blogs', err);
    res.status(500).send('Error fetching blogs');
  }
});

// Other routes
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
    let imageUrl = null;
    
    if (req.file) {
      const result = await cloudinary.uploader.upload_stream({
        resource_type: 'auto',
      }, (error, result) => {
        if (error) {
          return res.status(500).send('Cloudinary upload error');
        }
        imageUrl = result.url; // Save the image URL
        createBlog(req, res, imageUrl); // Pass the image URL for blog creation
      });

      req.pipe(result);
    } else {
      createBlog(req, res, imageUrl); // Proceed without an image if none is uploaded
    }
  } catch (err) {
    console.error('Error uploading file to Cloudinary', err);
    res.status(500).send('Error uploading file to Cloudinary');
  }
});

// Edit and delete operations
router.post('/editblog/:id', auth, upload.single('image'), async (req, res) => {
  try {
    let imageUrl = req.body.existingImageUrl; // Retain existing image if no new one is uploaded
    
    if (req.file) {
      const result = await cloudinary.uploader.upload_stream({
        resource_type: 'auto',
      }, (error, result) => {
        if (error) {
          return res.status(500).send('Cloudinary upload error');
        }
        imageUrl = result.url; // Update image URL if a new image is uploaded
        updateBlog(req, res, imageUrl); // Call the updateBlog function with new image URL
      });

      req.pipe(result);
    } else {
      updateBlog(req, res, imageUrl); // No image uploaded, proceed with blog update
    }
  } catch (err) {
    console.error('Error uploading file to Cloudinary', err);
    res.status(500).send('Error uploading file to Cloudinary');
  }
});

// Delete operation
router.delete('/delete/:id', auth, deleteBlog);

module.exports = router;
