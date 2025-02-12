const { default: axios } = require('axios');
const express = require('express');
const authenticate = require('../../Middlewares/authenticate');
const editRouter = express.Router();

// Define route handlers (controllers) related to AllBlogs here
editRouter.get('/:id' ,(req, res) => {
    // const head = 'Edit Blog';
    const {id} = req.params;
    console.log(id);
    axios.get(`http://localhost:3000/blogs/${id}`).then( (response) =>{
        const blog= response.data;
        console.log(blog);
        res.render('editblog', {blog});
    });
   
    // res.render('editblog', {head});
    
});



module.exports = editRouter;