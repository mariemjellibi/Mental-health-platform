// routes/messageRoutes.js
import express from 'express';
import protectRoutes from '../middlewares/authMiddleware.js';
import { handleChat,getChatHistory  } from '../controllers/messageController.js';
const router = express.Router();

router.post('/chat', protectRoutes, handleChat);
router.get("/chat-history", protectRoutes, getChatHistory);
export default router;
