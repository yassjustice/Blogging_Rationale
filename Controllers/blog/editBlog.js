const Blog = require('../../Models/blog'); // Assuming you have a Blog model
const cloudinary = require('cloudinary').v2;

// Get blog by ID (for rendering the edit page)
const getBlogById = async (id) => {
  try {
    const blog = await Blog.findById(id);
    return blog;
  } catch (err) {
    throw new Error('Blog not found');
  }
};

// Update blog by ID (for saving the edited blog)
const updateBlog = async (req, res, imageUrl) => {
  try {
    const { title, content } = req.body;
    const updatedData = {
      title,
      content,
      imageUrl: imageUrl || req.body.existingImageUrl, // Update imageUrl only if a new one is provided
    };

    // Update the blog in the database
    const blog = await Blog.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    if (!blog) {
      return res.status(404).send('Blog not found');
    }

    res.redirect(`/blogs/${blog._id}`); // Redirect to the blog detail page (or anywhere you prefer)
  } catch (err) {
    console.error('Error updating blog', err);
    res.status(500).send('Error updating blog');
  }
};

// Export the functions
module.exports = {
  getBlogById,
  updateBlog,
};
