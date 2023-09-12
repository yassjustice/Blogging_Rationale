const express = require('express');
const loginRouter = express.Router();

// Define route handlers (controllers) related to AllBlogs here
loginRouter.get('/',(req, res) => {
    const head = 'login';
    res.render('login', {head});
});



module.exports = loginRouter;