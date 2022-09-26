const express = require('express');
const router = express.Router();
const{ registerUser, getAllUsers, loginUser, logoutUser, getMe } = require('../controller/authController');

// Get All Users
router.get('/', getAllUsers);

// Register
router.post('/register', registerUser);

// Login
router.post('/login', loginUser);

// Logout
router.get('/logout', logoutUser);

// Me
router.get('/me/:id', getMe);

module.exports = router;