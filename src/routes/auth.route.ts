// routes/authRoutes.ts
import { Router } from 'express';
import { login, me } from '../controllers/auth.controller';
import { authenticateJWT } from '../middlewares/authenticateJWT';

const router = Router();

router.post('/login', login);
router.get('/me', authenticateJWT, me);

export default router;
