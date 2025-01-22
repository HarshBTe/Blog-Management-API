const Blog = require('../models/Blog');

exports.createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const blog = new Blog({ title, content });
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.editBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    if (req.user.role === 'Editor' && blog.assignedEditor.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to edit this blog' });
    }

    const { title, content } = req.body;
    if (title) blog.title = title;
    if (content) blog.content = content;
    await blog.save();

    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
