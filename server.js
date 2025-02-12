const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const cookies = require('cookie-parser');
const cors = require('cors');

// CORS Configuration
var corsOptions = {
  origin: ['http://localhost:3000'], // Adjust as needed for Vercel deployments
};

// Middleware
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(bodyparser.json());
app.use(cookies());
app.use(express.static('uploads'));
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

// Load routes
const routes = require('./Routes');
app.use('/', routes);

// Export the Express app for Vercel
module.exports = app;
