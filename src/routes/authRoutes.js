// routes/authRoutes.js
const express = require('express');
const { registerUser, loginUser, getDoctors } = require('../controllers/userController');
const router = express.Router();

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);
// GET doctors only
router.get("/doctors", getDoctors);

module.exports = router;
