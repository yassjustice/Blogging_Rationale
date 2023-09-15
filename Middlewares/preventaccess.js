const jwt = require('jsonwebtoken')
const secret = 'YassirHakimi'

function preventAccess(req, res, next) {
    const token = req.cookies.jwtToken;
    if (token) {
      // If token is present, the user is already authenticated
      return res.redirect('/dashboard'); // Redirect them to the dashboard
    }
    
    // If token is not present, continue to the next middleware
    next();
  }
  
  module.exports = preventAccess;
  