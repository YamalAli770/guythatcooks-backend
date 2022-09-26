const express = require('express');
const router = express.Router();
const { favouriteBlog } = require('../controller/userController');
const verifyJWT = require('../middleware/verifyJWT');

// Make Favourite //Private
router.put('/favourite/:id', verifyJWT, favouriteBlog);

module.exports = router;