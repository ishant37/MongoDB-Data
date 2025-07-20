import express from 'express';
import { authenticationMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();


router.get('/', authenticationMiddleware, (req, res) => {
  res.status(200).json({ message: 'Welcome to the private route', user: req.user });
});



export default router;