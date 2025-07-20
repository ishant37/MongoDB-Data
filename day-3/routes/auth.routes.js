import express from 'express'
import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
const router = express.Router()


router.post('/signup', async (req, res) => {
  // Logic for user signup
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({username});
    if(existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error', success: false });
  }
});

router.post('/login', async (req, res) => {
  // Logic for user login
  const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials:Invalid username or password' });
        }
        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
});

export default router;