import { Router } from 'express';
import { XpAndCoinController } from '../controllers/coinAndXp.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.get('/xp/balance', XpAndCoinController.getXpBalance);
router.get('/coin/balance', XpAndCoinController.getCoinBalance);
router.get('/xp/history', XpAndCoinController.getXpHistory);
router.get('/coin/history', XpAndCoinController.getCoinHistory);
router.get('/stats', XpAndCoinController.getGamificationStats);

export default router;
