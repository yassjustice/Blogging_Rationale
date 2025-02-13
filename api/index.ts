// const express = require("express");
// const bodyparser = require("body-parser");
// const cookies = require("cookie-parser");
// const cors = require("cors");
// const mongoose = require("mongoose");
// require("dotenv").config();
// const jwt = require("jsonwebtoken");
// const routes = require("../Routes"); // Update path
// const flash = require("connect-flash");
// const session = require("express-session");
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import routes from '../Routes'; // Ensure this path is correct relative to your current file
import flash from 'connect-flash';
import session from 'express-session';

// Initialize environment variables
dotenv.config();

const app = express();

// Middleware Setup
app.use(
    session({
      secret: process.env.SESSION_SECRET || "your_secret_key", // Ensure secret is a string
      resave: false,
      saveUninitialized: true,
    })
  );

app.use(flash());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Middleware to set user globally for all routes
app.use((req, res, next) => {
  try {
    const user = req.cookies.jwtToken
      ? jwt.verify(req.cookies.jwtToken, process.env.JWT_SECRET as string)
      : null;
    res.locals.user = user;
  } catch (err) {
    console.error("JWT Verification Error:", err instanceof Error ? err.message : "Unknown error");
    res.locals.user = null;
  }
  next();
});

// MongoDB Connection
const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return; // Skip if already connected
    try {
      await mongoose.connect(process.env.MONGODB_URI as string); // No need for additional options
      console.log("MongoDB connected");
    } catch (err) {
      console.error("MongoDB connection error:", err instanceof Error ? err.message : "Unknown error");
    }
  };
  

connectDB();

// Routes Setup
app.use("/", routes);

// Export app for deployment
export default app;
