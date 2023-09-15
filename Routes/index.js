const express = require('express');
const router = express.Router();
const multer = require('multer')
const auth = require("../Middlewares/authenticate")

const allBlogs = require('../Controllers/allBlogs');
const dashrouter = require('../Controllers/dashboard');
const editRouter = require('../Controllers/editBlog');
const loginRouter = require('../Controllers/login');
const RegisterRouter = require('../Controllers/register');

const logoutRouter = require('../Controllers/logout');
const addBrouter = require('../Controllers/addblog');
const { createBlog, getBlog, updateBlog, deleteBlog } = require('../Controllers/blog');




//more variables
let errorMessage;

// Define your routes here
// For example:
router.use('/allblogs', allBlogs);
router.use('/dashboard', dashrouter);
router.use('/editblog', editRouter);
router.use('/login', loginRouter);
router.use('/register', RegisterRouter); 
router.use('/logout', logoutRouter); 
router.use("/addblog", addBrouter);
// router.use("/blogrouter", );


//multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Specify the destination folder for uploaded files
      cb(null, "public/uploads");
    },
    filename: function (req, file, cb) {
      // Define the filename for uploaded files
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });


// Create a new blog
router.post('/blogs', upload.single("image"), auth , createBlog);

// Get a blog by ID
router.get('/blogs/:id', getBlog);

// Update a blog by ID
router.put('/blogs/:id', updateBlog);

// Delete a blog by ID
router.delete('/blogs/:id', deleteBlog);



module.exports = router;