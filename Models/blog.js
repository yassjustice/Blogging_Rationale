const mongoose = require('mongoose');

// Define the Blog schema
const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: { type: String },
    createdAt: { type: Date, default: Date.now },
});

// Create the Blog model using the schema
const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
