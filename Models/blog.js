const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: String,
  content: String,
  imageUrl: String, // URL of the image (from Cloudinary)
});

const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;
