import express from 'express';
import { getMessageById, getUserForSidebar, sendMessage } from '../controllers/message.controller.js';
import { protectroute } from '../middleware/auth.middleware.js';



const router = express.Router();

router.get('/users',protectroute,getUserForSidebar);
router.get('/:id',protectroute,getMessageById);
router.post('/send/:id',protectroute,sendMessage);

export default router;
