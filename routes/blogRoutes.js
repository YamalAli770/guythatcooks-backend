const express = require('express');
const router = express.Router();
const { getAllBlogs, getBlog, createBlog, updateBlog, deleteBlog } = require('../controller/blogController');
const verifyJWT = require('../middleware/verifyJWT');

// Get ALl Blogs //Public
router.get('/', getAllBlogs);

// Get Single Blog //Public
router.get('/:id', getBlog);

// Create Blog //Private
router.post('/', verifyJWT, createBlog);

// Update Blog //Private
router.put('/:id', verifyJWT, updateBlog);

// Delete Blog //Private
router.delete('/:id', verifyJWT, deleteBlog);

module.exports = router;