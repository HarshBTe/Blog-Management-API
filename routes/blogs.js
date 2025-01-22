const express = require('express');
const { createBlog, editBlog } = require('../controllers/blogController');
const authenticate = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const router = express.Router();

router.post('/', authenticate, authorize(['Admin']), createBlog);
router.put('/:id', authenticate, authorize(['Admin', 'Editor']), editBlog);

module.exports = router;
