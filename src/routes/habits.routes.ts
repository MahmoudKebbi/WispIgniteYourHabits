import { Router } from "express";
import { HabitController } from '../controllers/habits.controller';
import { authenticateJWT } from '../middlewares/authenticateJWT';

const router = Router();

// === Habit Routes ===
router.post('/create', authenticateJWT, HabitController.createHabit);


export default router;