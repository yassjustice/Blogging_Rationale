const express = require('express');
const res = require('express/lib/response');
const RegisterRouter = express.Router();
const bcrypt = require('bcrypt');
const axios = require('axios');
const preventAccess = require('../Middlewares/preventaccess');
const nameCheck = require('../Middlewares/checknamedup');
// const users = require('../Models/db.json')
const secret = 'YassirHakimi'


// Define route handlers (controllers) related to AllBlogs here
RegisterRouter.get('/', preventAccess ,(req, res) => {
    
    errorMessage = "";
    const  data = {
        errorMessage:errorMessage,
        head: "Sign Up",
        change: `
        <script>
        // Get the checkbox element by its class name
        const checkbox = document.querySelector(".toggle");
        
        // Toggle the "checked" property of the checkbox
        checkbox.checked = true;
        </script>
            
            `
      };
      
      res.render("register",{data} );
});

RegisterRouter.post('/',async (req,res)=>{
    const { password, name, email } = req.body;
    const saltRounds = 10;
    if (!email || !password || !name) {
        
        errorMessage = " invalid input";
        const data = {
            head: "Sign Up",
        change: `
        <script>
        // Get the checkbox element by its class name
        const checkbox = document.querySelector(".toggle");
        
        // Toggle the "checked" property of the checkbox
        checkbox.checked = true;
        </script>
            
            `,
          errorMessage: errorMessage,

        };
    
        res.render("register", {data}); // Pass the error message and email back to the form
      }
      const same = await nameCheck(name);
      if (same ) {
        errorMessage = " Name Already taken";
        const data = {
            head: "Sign Up",
        change: `
        <script>
        // Get the checkbox element by its class name
        const checkbox = document.querySelector(".toggle");
        
        // Toggle the "checked" property of the checkbox
        checkbox.checked = true;
        </script>
            
            `,
          errorMessage: errorMessage,

        };
       res.render("register", {data});
      }

      bcrypt.hash(password, saltRounds, function (err, hashedPassword) {
        if (err) {
          // Handle the error (e.g., return an error response)
          console.error(err);
          return res.status(500).send("Internal Server Error");
        }
    
        // 'hashedPassword' is the hashed password that you'll store in the database
        const lol = hashedPassword;
    
        // Save user to JSON Server
        axios
          .post("http://localhost:3000/users", {
            password: lol,
            email: email,
            name: name
          })
          .then(() => {
            // const user = response.data;
            // //  Create JWT
            // const token = jwt.sign(user, secret, { expiresIn: "1h" });
            // // res.json({ token });
            // res.cookie("jwtToken", token, { maxAge: 3600000, httpOnly: true }); // Expires in 1 hour
            //go to login
            res.redirect("/login");
          })
          .catch((error) => {
            console.error(error);
            return res.status(500).send("Internal Server Error");
          });
      });
    

}
);


module.exports = RegisterRouter;