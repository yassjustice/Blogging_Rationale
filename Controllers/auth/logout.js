const express = require('express');
const logoutRouter = express.Router();

logoutRouter.get('/', (req, res) => {
  res.clearCookie('jwtToken');
  res.redirect('/login');
});

module.exports = logoutRouter;
