const express = require('express');
const {Add_Blog, Delete_Blog, Update_Blog, Read_Blog} = require('../Api/blogapi');

//Create
exports.createBlog = (req,res)=>{
    //getting blog info from user
    const {name} = req.user
    console.log(req.file)


    const{title,desc,image}= req.body;
    const newBlog = {
        title : title,
        desc : desc,
        author: name,
        image: req.file.filename
    }
    Add_Blog(newBlog);
    res.end();
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
exports.updateBlog = (req, res) => {
    const { id } = req.params;
    const { title, description, author } = req.body;
    const updatedBlog = {
        title,
        description,
        author
    };
    Update_Blog(id, updatedBlog);
    res.end();
}
//Delete Blog
exports.deleteBlog = (req, res) => {
    const { id } = req.params;
    Delete_Blog(id);
    res.end();
}