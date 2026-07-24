const bcrypt = require('bcrypt');
const User = require('../models/model');
const SALT_ROUNDS = 10;

// POST /register
exports.registerUser = async (req, res) => {
    const { username, password, email, first_name, last_name } = req.body;
    if (!username || !password || !email || !first_name || !last_name) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const newUser = await User.registerUser(
        { username, email, first_name, last_name },
        hashedPassword
        );
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// POST /login
exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
      const hashedPassword = await User.findPasswordByUsername(username);
      if (!hashedPassword) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      const isMatch = await bcrypt.compare(password, hashedPassword);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.getAll();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.getById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { username, email, first_name, last_name } = req.body;
    if (!username || !email || !first_name || !last_name) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const updatedUser = await User.update(req.params.id, username, email, first_name, last_name);
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};
