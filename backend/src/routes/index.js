import express from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import requestRoutes from './requestRoutes.js';
import messageRoutes from './messageRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/requests', requestRoutes);
router.use('/messages', messageRoutes);

export default router;
