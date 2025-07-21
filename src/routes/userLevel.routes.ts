import { Router } from 'express';
import { UserLevelController } from '../controllers/userLevels.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
router.use(authMiddleware);
router.get('/level', UserLevelController.getLevel);
router.get('/xp-progress', UserLevelController.getXpProgress);

export default router;
