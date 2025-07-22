import jwt from 'jsonwebtoken';
import User from '../models/user.mdel.js';
export const authMiddleware = async (req, res, next) => {
    try {
        const token=req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized-No token Provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: 'Unauthorized-Invalid token' });
        }

        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized-User not found' });
        }

        req.user = user;
        next();

    } catch (error) {
        console.error('Error during authentication:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
}