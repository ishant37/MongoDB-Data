import express from 'express';
import { signup, login, logout, updateProfile, checkauth } from '../controllers/auth.controller.js';
import { protectroute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.put('/update-profile', protectroute, updateProfile);
router.get('/check', protectroute, checkauth);

export default router;
