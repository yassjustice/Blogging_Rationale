const express = require('express');
const router = express.Router();
const multer = require('multer')
const auth = require("../Middlewares/authenticate")

const allBlogs = require('../Controllers/allBlogs');
const dashrouter = require('../Controllers/dashboard');
const editRouter = require('../Controllers/editBlog');
const loginRouter = require('../Controllers/login');
const RegisterRouter = require('../Controllers/register');
const myBlogs = require('../Controllers/myblogs');
const logoutRouter = require('../Controllers/logout');
const addBrouter = require('../Controllers/addblog');
const { createBlog, getBlog, updateBlog, deleteBlog, getmyBlog } = require('../Controllers/blog');
const preventAccess = require('../Middlewares/preventaccess');





//more variables
let errorMessage;

// Define your routes here
// For example:
// router.use(auth);
router.use('/allblogs', allBlogs);
router.use('/dashboard',auth, dashrouter);
router.use('/editblog',auth, editRouter);
router.use('/login', loginRouter);
router.use('/register', RegisterRouter); 
router.use('/logout', logoutRouter); 
router.use("/addblog",auth, addBrouter);
router.use("/myblogs",auth, myBlogs)
// router.use("/blogrouter", );


//multer
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       // Specify the destination folder for uploaded files
//       cb(null, "public/uploads");
//     },
//     filename: function (req, file, cb) {
//       // Define the filename for uploaded files
//       cb(null, Date.now() + "-" + file.originalname);
//     },
//   });
  
//   const upload = multer({ storage: storage });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "/tmp"); // Temporary storage on Vercel
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
const upload = multer({ storage: storage });



// Create a new blog
router.post('/blogs', upload.single("image"), auth , createBlog);

// Get a blog by ID
// router.get('/blogs', auth, getmyBlog);

// Update a blog by ID
router.post('/editblog/:id',auth,upload.single("image"), updateBlog);

// Delete a blog by ID
router.delete('/delete/:id',auth, deleteBlog); 

//get myblogs page
// router.use('/myblogs', auth, myBlogs);

//get blogs/author
// router.get('/blogs/:id', updateBlog);

module.exports = router;
