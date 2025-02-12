// Importing any necessary modules (e.g., MongoDB)
const Blog = require('../Models/blog'); 

// If you're using mock data for now:
const mockBlogs = [
    { title: 'Blog 1', content: 'Content of blog 1', imageUrl: '/path/to/image1.jpg' },
    { title: 'Blog 2', content: 'Content of blog 2', imageUrl: '/path/to/image2.jpg' },
];

// This will fetch blogs from MongoDB (or mock data for now)
exports.getAllBlogs = async () => {
  // In production (MongoDB):
  // return await Blog.find({});
  
  // For now, returning mock data:
  return mockBlogs;
};
