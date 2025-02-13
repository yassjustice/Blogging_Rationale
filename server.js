const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cookies = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const flash = require("connect-flash");

const session = require("express-session"); // Add this line
const isProduction = process.env.NODE_ENV === "production";

// Middleware
app.use(
    session({
        secret: process.env.SESSION_SECRET || "your_secret_key", // You can put your own secret here
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

    // Make the user available to all views
    res.locals.user = user;

    next();
});

// Connect to MongoDB
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Load routes
const routes = require("./Routes");
app.use("/", routes);

// Conditional check to see if it's running on Vercel or locally
if (!isProduction) {
    // Only listen on a port when running locally
    const PORT = process.env.PORT || 7500;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
} else {
    // Vercel automatically handles the server
    module.exports = app;
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});
