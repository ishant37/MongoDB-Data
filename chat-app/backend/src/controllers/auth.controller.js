import bcrypt from 'bcryptjs';
import User from '../models/user.mdel.js';
import { generateToken } from '../../utils/utils.js';
import cloudinary from '../lib/cloudidary.js';

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

export const login = async (req, res) => {
  const {email,password} = req.body;
  try {
    const user= await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    generateToken(user._id, res);
    return res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    console.error('Error during login:', error.message);
    return res.status(500).json({ message: 'Internal server error' ,success: false});
  }
};

export const logout = (req, res) => {
  try {
    res.cookie('jwt', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0, // Clear the cookie
    });
    res.status(200).json({ message: 'Logout successful', success: true });
  } catch (error) {
    console.error('Error during logout:', error.message);
    return res.status(500).json({ message: 'Internal server error', success: false });
  }
};

export const updateProfile = async(req, res) => {
  try {
    const { profilePicture } = req.body;
    if(!profilePicture) {
      return res.status(400).json({ message: 'Profile picture is required' });
    }
    const uploadResult = await cloudinary.uploader.upload(profilePicture);
    const user = await User.findByIdAndUpdate(req.user._id,
      { profilePicture: uploadResult.secure_url },
      { new: true }
    );
    return res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error('Error during profile update:', error.message);
    return res.status(500).json({ message: 'Internal server error', success: false });
  }
};
