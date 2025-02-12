const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const cookies = require('cookie-parser');
const cors = require('cors');

// Middleware
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(bodyparser.json());
app.use(cookies());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Load routes
const routes = require('./Routes');
app.use('/', routes);

// ✅ Instead of `app.listen()`, export the app
module.exports = app;
