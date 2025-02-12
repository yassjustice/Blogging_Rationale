const Blog = require('../Models/blog');

// Create Blog
exports.createBlog = async (req, res) => {
  try {
    const { title, desc } = req.body;
    const author = req.user.name; // Assuming the user is authenticated
    const image = req.file ? req.file.filename : 'default.jpg'; // Handle image file

    const newBlog = new Blog({
      title,
      desc,
      author,
      image
    });

    await newBlog.save();
    res.redirect('/dashboard'); // Redirect after creating the blog
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating blog');
  }
};

// Read a Single Blog
exports.getBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching blog');
  }
};

// Update Blog
exports.updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, desc, author } = req.body;
  try {
    const updatedBlog = {
      title,
      desc,
      author,
      image: req.file ? req.file.filename : undefined
    };

    const blog = await Blog.findByIdAndUpdate(id, updatedBlog, { new: true });
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.redirect('/myblogs');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating blog');
  }
};

// Delete Blog
exports.deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.redirect('/myblogs');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting blog');
  }
};
