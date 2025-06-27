// controllers/userController.js
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require('dotenv').config();

// Register a new user (signup)
const registerUser = async (req, res) => {
  const { full_name, email, password, role, specialization } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      full_name,
      email,
      password: hashedPassword,
      role,
      specialization: role === 'doctor' ? specialization : null,
    });

    // Ensure JWT_SECRET is defined
    const secret = process.env.JWT_SECRET || 'mySuperSecretKey123!@#';
    if (!secret) {
      throw new Error('JWT_SECRET is not defined');
    }

    // Generate token
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      secret,
      { expiresIn: '1h' }
    );

    // Respond
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        full_name: newUser.full_name,
        email: newUser.email,
        role: newUser.role,
        specialization: newUser.specialization,
      },
      token,
    });
  } catch (error) {
    console.error('Error registering user:', error.message);
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};


// Login user (authenticate)
const getDoctors = async (req, res) => {
  try {
    const doctors = await User.findAll({
      where: { role: "doctor" },
      attributes: ["id", "full_name", "specialization"],
    });
    res.json(doctors);
  } catch (err) {
    console.error("Failed to fetch doctors", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Check if password matches
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Generate JWT token
  const token = jwt.sign({ id: user.id , full_name: user.full_name,}, process.env.JWT_SECRET, {
  expiresIn: "1h",
});

res.json({ token, user });
};




module.exports = { registerUser, loginUser, getDoctors};
