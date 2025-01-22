const express = require('express');
const { addComment, deleteComment } = require('../controllers/commentController');
const authenticate = require('../middleware/auth');
const router = express.Router();

router.post('/:id', authenticate, addComment);
router.delete('/:id', authenticate, deleteComment);

module.exports = router;