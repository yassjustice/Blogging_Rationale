const express = require('express');
const authenticate = require('../Middlewares/authenticate');
const { Read_Blogs } = require('../Api/blogapi');
const dashrouter = express.Router();

// Define route handlers (controllers) related to AllBlogs here
dashrouter.get('/', authenticate, async (req, res) => {
    const user = req.user;
    const head = 'Dashboard'; 
    // console.log(user);
    Read_Blogs().then((response) =>{
      const blogs= response.data;
      const userblogs = blogs.filter(blog => blog.author == user.name);
      const totalUserBlogs = userblogs.length;
      const data = {
        email: user.email,
        name: user.name,
        head:head,
        totalUserBlogs: totalUserBlogs
      }
       res.render('dashboard', {data});
       res.render('../navbar.ejs', { data });

    }

    )
   

    
    
});



module.exports = dashrouter;