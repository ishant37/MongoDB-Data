import bcrypt from 'bcryptjs';
import User from '../models/user.mdel.js';
import { generateToken } from '../../utils/utils.js';

export const signup = async (req, res) => {
  const { email, fullName, password, profilePicture } = req.body;

  try {
    // Validate required fields
    if (!email || !fullName || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      email,
      fullName,
      password: hashedPassword,
      profilePicture: profilePicture || '',
    });

    // Save user and generate token
    await newUser.save();
    generateToken(newUser._id, res);

    return res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser._id,
        email: newUser.email,
        fullName: newUser.fullName,
        profilePicture: newUser.profilePicture,
      },
    });

  } catch (error) {
    console.error('Error during signup:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const login = (req, res) => {
  res.send('Login logic goes here');
};

export const logout = (req, res) => {
  res.send('Logout logic goes here');
};

export const updateProfile = (req, res) => {
  res.send('Update profile logic goes here');
};
