import { Request, Response } from 'express';
import { HabitService } from '../services/habit.service';

export class HabitController {
  static async createHabit(req: Request, res: Response) {
    try {
      const user = req.user as { id: string };
      const userId = user?.id;

      const {
        name,
        description,
        frequency,
        goalPerPeriod,
        xpReward,
        coinReward,
        daysOfWeek,
      } = req.body;

      const habit = await HabitService.createHabit(userId, {
        name,
        description,
        frequency,
        goalPerPeriod,
        xpReward,
        coinReward,
        daysOfWeek,
      });

      return res.status(201).json({
        message: 'Habit created successfully',
        habit,
      });
    } catch (err: any) {
      console.error('Create habit error:', err);
      return res.status(400).json({ error: err.message || 'Could not create habit' });
    }
  }
}
