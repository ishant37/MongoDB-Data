import bcycpt from 'bcrypt';
import User from '../models/user.model.js';

export const registerUser= async (name,password) => {
  const hashedPassword = await bcycpt.hash(password, 10);
  const User = new User({ name, password: hashedPassword });
  return await User.save();
};
