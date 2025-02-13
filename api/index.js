const express = require("express");
const bodyparser = require("body-parser");
const cookies = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const routes = require("../Routes"); // Update path
const flash = require("connect-flash");
const session = require("express-session");

const app = express();

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
    try {
        const user = req.cookies.jwtToken
            ? jwt.verify(req.cookies.jwtToken, process.env.JWT_SECRET)
            : null;
        res.locals.user = user;
    } catch (err) {
        console.error("JWT Verification Error:", err.message);
        res.locals.user = null;
    }
    next();
});

// Connect to MongoDB
mongoose
    .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/", routes);

// Export app for Vercel
module.exports = app;
