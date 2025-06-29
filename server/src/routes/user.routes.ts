import express from 'express';
import { getUser, updateUser } from '../controllers/User';
import { authMiddleware } from '../middlewares/auth';

const router = express.Router();

router.get('/users/:userId', authMiddleware, getUser);
router.put('/users/:userId', authMiddleware, updateUser);

export default router;