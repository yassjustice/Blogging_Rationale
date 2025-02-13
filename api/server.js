const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cookies = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const jwt = require("jsonwebtoken");
// Load routes
const routes = require("./Routes");

const flash = require("connect-flash");
const session = require("express-session");

// Middleware
app.use(
    session({
        secret: process.env.SESSION_SECRET || "your_secret_key",
        resave: false,
        saveUninitialized: true,
    })
);
app.use(flash());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(bodyparser.json());
app.use(cookies());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Middleware to set user globally for all routes
app.use((req, res, next) => {
    const user = req.cookies.jwtToken
        ? jwt.verify(req.cookies.jwtToken, process.env.JWT_SECRET)
        : null;
    res.locals.user = user;
    next();
});

// Connect to MongoDB
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));


app.use("/", routes);

// Export the app for Vercel serverless function
if (process.env.VERCEL) {
    // This is the Vercel deployment
    module.exports = app;
} else {
    // This is local development, start the server locally
    const PORT = process.env.PORT || 7500;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});
