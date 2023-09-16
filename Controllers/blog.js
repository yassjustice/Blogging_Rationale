const express = require('express');
const {Add_Blog, Delete_Blog, Update_Blog, Read_Blog, Read_myBlog} = require('../Api/blogapi');
const authenticate = require('../Middlewares/authenticate');

//Create
exports.createBlog = (req,res)=>{
    //getting blog info from user
    const {name} = req.user
    // console.log(req.file)


    const{title,desc,image}= req.body;
    const newBlog = {
        title : title,
        desc : desc,
        author: name,
        image: req.file.filename
    }
    Add_Blog(newBlog);
    res.redirect("/dashboard");
}

//Read Blog then display it

exports.getBlog = (req, res) => {
    // Get the ID from the request parameters
    // When the Blog is selected, the id is sent to the req.params
    const { id } = req.params;

    // Call the Read_Blog function to get the blog by ID
    const blog = Read_Blog(id);

    // Check if the blog was found
    if (blog) {
        res.json(blog); // Send the blog as a JSON response
    } else {
        res.status(404).json({ message: 'Blog not found' }); // Send a 404 status if the blog was not found
    }
}
//Update Blog
exports.updateBlog =  (req, res) => {
    const { id } = req.params;
    const { title, desc, author } = req.body;
    
    
    const image = req.file.filename;
    const updatedBlog = {
        title: title,
        desc: desc,
        author: author,
        image: image
    };
     Update_Blog(id, updatedBlog)
    // res.redirect('myblogs');
    res.end();
}
//Delete Blog
exports.deleteBlog = (req, res) => {
    const { id } = req.params;
    console.log(id);
    Delete_Blog(id);

    res.end();
}

// exports.getmyBlog = async (req, res) => {
//     // Get the ID from the request parameters
//     // When the Blog is selected, the id is sent to the req.params
//     const { author } = req.user;
//     // console.log(author);
   
//     const blog = await Read_myBlog(author);
//     // console.log(blog);
   
//     if (blog) {
      
//       const data = {
//         blogs: blog,
//         head: head,
//       };
//     //   console.log(data);
     
//       res.render("myblogs", { data });
      
//     } else {
//       res.status(404).json({ message: "no blogs found" }); // Send a 404 status if the blog was not found
//     }
//   };