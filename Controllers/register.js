const express = require('express');
const RegisterRouter = express.Router();

// Define route handlers (controllers) related to AllBlogs here
RegisterRouter.get('/',(req, res) => {
    const head = 'Register';
    res.render('register', {head});
});



module.exports = RegisterRouter;