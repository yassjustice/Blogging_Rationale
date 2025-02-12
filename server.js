const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const cookies = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// Middleware
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(bodyparser.json());
app.use(cookies());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Load routes
const routes = require('./Routes');
app.use('/', routes);

// Conditional check to see if it's running on Vercel or locally
if (!process.env.VERCEL) {
    // Only listen on a port when running locally
    const PORT = process.env.PORT || 7500; // Use 7500 or any local port
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
} else {
    // Vercel automatically handles the server
    module.exports = app;
}
