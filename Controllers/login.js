const express = require("express");
const res = require("express/lib/response");
const loginRouter = express.Router();
const authenticate = require('../Middlewares/authenticate');
const preventAccess = require("../Middlewares/preventaccess");
const jwt = require('jsonwebtoken')
const secret = 'YassirHakimi'
const axios = require('axios')
const bcrypt = require('bcrypt');
const cookies = require('cookie-parser');

loginRouter.use(cookies())


// const jwt = require('jsonwebtoken')
// const secret = 'YassirHakimi'
// const axios = require('axios')
// const bcrypt = require('bcrypt');
// const cookies = require('cookie-parser')
// loginRouter.use(cookies())

// Define route handlers (controllers) related to AllBlogs here
loginRouter.get("/", preventAccess, (req, res) => {
    errorMessage = "";
  const  data  = {
    errorMessage:errorMessage,
    head: "login",
    change: `<script>
    // Get the checkbox element by its class name
    const checkbox = document.querySelector(".toggle");
    
    // Toggle the "checked" property of the checkbox
    checkbox.checked = false;
    </script>
        `
  };
  res.render("register", { data });
});

loginRouter.post('/',  async(req,res, next) => {
    try {
        const { email, password, name} = req.body;
      
          // Check if the email exists in the database
          const response = await axios.get(`http://localhost:3000/users?email=${email}`);
          
        //   console.log(response);
          const user = response.data[0];
          // const user = response.data;
      
          if (!user) {
            errorMessage = " Email not found";
          const data = {
            errorMessage: errorMessage
          };
      
          return res.render('register', {data});
            // return res.status(400).send("Email not registered");
          }
      
          // Compare the hashed passwords
          bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
              console.error(err); // Log the error for debugging
              return res.status(500).send("Internal Server Error");
            }
      
            if (!result) {
              // return res.status(401).send("Invalid Password");
              errorMessage = " wrong password";
          const data = {
            errorMessage: errorMessage
          };
      
          return res.render("register", {data});
            }
      
            // If password is correct, create and send JWT
            const token = jwt.sign({ email: user.email, password: user.password, name: user.name ,image: user.image}, secret, { expiresIn: "1h" });
            res.cookie("jwtToken", token, { maxAge: 3600000, httpOnly: true });
      
            res.redirect('/dashboard');
          });
      
      
      } catch (err) {
        console.error("An error occurred:", err);
        return res.status(500).send("Internal Server Error");
      }
      
});

module.exports = loginRouter;
