const express = require('express');
const editRouter = express.Router();

// Define route handlers (controllers) related to AllBlogs here
editRouter.get('/',(req, res) => {
    const head = 'Edit Blog';
    res.render('editblog', {head});
});



module.exports = editRouter;