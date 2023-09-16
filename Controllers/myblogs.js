const express = require("express");
const authenticate = require("../Middlewares/authenticate");
const { Read_myBlog } = require("../Api/blogapi");
const { default: axios } = require("axios");
const myBlogs = express.Router();

// Define route handlers (controllers) related to AllBlogs here
myBlogs.get("/", async (req, res) => {
    const user = req.user;
  const head = "My Blogs";
    axios.get("http://localhost:3000/blogs").then( (response) =>{
  
  // console.log("blog is " +  response.data )
  // console.log(author);
  // console.log("name is" + response.data);
  const blogs= response.data;
  const userblogs = blogs.filter(blog => blog.author == user.name);
  
    if (userblogs) {
        const data = {
          blogs: userblogs,
          head: head
        };
        // console.log(data);
        res.render("myblogs",{userblogs});
        // res.render("myblogs", { data });
      } else {
        res.status(404).json({ message: "no blogs found" }); // Send a 404 status if the blog was not found
      }
    }
  )

 
});

// exports.getmyBlog = async (req, res) => {
//   // Get the ID from the request parameters
//   // When the Blog is selected, the id is sent to the req.params
//   const { author } = req.body;

//   // Call the Read_Blog function to get the blog by author
//   const blog = await Read_myBlog(author);

//   // Check if the blog was found
//   if (blog) {
//     const blogs = JSON.parse(blog);
//     console.log(blogs);
//     const data = {
//       blogs: blogs,
//       head: head,
//     };
//     console.log(data);
//     // res.render("myblogs", { data });
//     // res.end();
//     res.JSON(data);

//   } else {
//     res.status(404).json({ message: "no blogs found" }); // Send a 404 status if the blog was not found
//   }
// };

module.exports = myBlogs;
