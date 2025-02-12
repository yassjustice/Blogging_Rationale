const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const cookies = require('cookie-parser');
const cors = require('cors');
const serverless = require('serverless-http');

// CORS Configuration
var corsOptions = {
  origin: ['http://localhost:3000'], // Adjust for your Vercel deployment
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

// Export for Vercel (wrap in serverless handler)
module.exports.handler = serverless(app);
