const Blog = require('../../Models/blog');

// Get All Blogs
exports.getAllBlogs = async () => {
  try {
    return await Blog.find({});
  } catch (err) {
    console.error('Error fetching blogs:', err);
    return [];
  }
};
