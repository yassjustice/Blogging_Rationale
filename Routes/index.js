const express = require('express');
const router = express.Router();
const multer = require('multer');
const auth = require('../Middlewares/authenticate');
const preventAccess = require('../Middlewares/preventaccess');

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

// Multer storage (Vercel-friendly)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/tmp'); // Temporary storage on Vercel
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = multer({ storage: storage });

// Routes
router.use('/allblogs', allBlogs);
router.use('/dashboard', auth, dashboardRouter);
router.use('/editblog', auth, editBlogRouter);
router.use('/login', loginRouter);
router.use('/register', registerRouter);
router.use('/logout', logoutRouter);
router.use('/addblog', auth, addBlogRouter);
router.use('/myblogs', auth, myBlogsRouter);

// Blog CRUD operations
router.post('/blogs', auth, upload.single('image'), createBlog);
router.post('/editblog/:id', auth, upload.single('image'), updateBlog);
router.delete('/delete/:id', auth, deleteBlog);

module.exports = router;

// Old Multer function for later use (commented out)
//
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         // Specify the destination folder for uploaded files
//         cb(null, "public/uploads");
//     },
//     filename: function (req, file, cb) {
//         // Define the filename for uploaded files
//         cb(null, Date.now() + "-" + file.originalname);
//     },
// });
//
// const upload = multer({ storage: storage });
