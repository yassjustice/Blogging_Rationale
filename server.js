// const express = require('express')
// const app = express()
// const path = require('path');
// const bodyparser = require('body-parser');
// const { body, validationResult } = require('express-validator');
// const xss = require('xss');
// const axios = require('axios')
// const users = require('./Models/db.json')
// const secret = 'YassirHakimi'
// const cookies = require('cookie-parser')
// const multer = require('multer')
// // const bcrypt = require('bcrypt');
// const cors = require('cors');
// const PORT = process.env.PORT || 7500;


// var corsOptions = {
//   origin : ['http://localhost:3000']
// }

// // middleware
// app.use(express.static('public'))
// app.set('view engine', 'ejs');
// app.use(express.json());
// app.use(bodyparser.json());
// app.use(cookies())
// app.use(express.static('uploads'))
// app.use(express.urlencoded({ extended: true })) 
// app.use(cors())

// // Load routes
// const routes = require('./Routes');
// app.use('/', routes);





// app.listen(PORT, () => {
//     console.log(`Server is listening on port ${PORT}`);
//   });

const express = require('express');
const app = express();
const path = require('path');
const bodyparser = require('body-parser');
const { body, validationResult } = require('express-validator');
const xss = require('xss');
const axios = require('axios');
const users = require('./Models/db.json');
const secret = 'YassirHakimi';
const cookies = require('cookie-parser');
const multer = require('multer');
const cors = require('cors');

// const PORT = process.env.PORT || 7500;

// CORS Configuration
var corsOptions = {
  origin: ['http://localhost:3000']
};

// Middleware
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(bodyparser.json());
app.use(cookies());
app.use(express.static('uploads'));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Load routes
const routes = require('./Routes');
app.use('/', routes);

// Export the Express app for Vercel (instead of listening directly)
module.exports = app;
