import { Request, Response } from 'express';
import { HabitService } from '../services/habit.service';
import { Category, HabitFrequency } from '../models/Habit'; // Adjust the path as needed

export class HabitController {
  // Create a new habit
  static async createHabit(req: Request, res: Response) {
    try {
      const user = req.user as { userId: string };
      if (!user?.userId) throw new Error('User not authenticated');
      const userId = user.userId;

      if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
      }

      const {
        name,
        description,
        frequency,
        goalPerPeriod,
        difficulty,
        category,
        xpReward,
        coinReward,
        daysOfWeek,
      } = req.body;

      if (!name || !goalPerPeriod) {
        return res.status(400).json({ error: 'Name and goal per period are required' });
      }

      if (goalPerPeriod < 1) {
        return res.status(400).json({ error: 'Goal per period must be at least 1' });
      }

      if (daysOfWeek) {
        const invalidDay = daysOfWeek.some((day: number) => day < 0 || day > 6);
        if (invalidDay) {
          return res.status(400).json({ error: 'daysOfWeek must contain values between 0 and 6' });
        }
      }

      if (!frequency || !difficulty || !category) {
        return res.status(400).json({ error: 'Frequency, difficulty, and category are required' });
      }

      const habit = await HabitService.createHabit(userId, {
        name,
        description,
        frequency,
        goalPerPeriod,
        difficulty,
        category,
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
      const statusCode = err.statusCode || 500;
      return res.status(statusCode).json({ error: err.message || 'Could not create habit' });
    }
  }

  // Get all active (non-archived) habits for user
  static async getAllHabits(req: Request, res: Response) {
    try {
      const user = req.user as { userId: string };
      if (!user?.userId) throw new Error('User not authenticated');
      const userId = user.userId;

      if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
      }

      const habits = await HabitService.getAllHabits(userId);

      return res.status(200).json({ habits });
    } catch (err: any) {
      console.error('Get habits error:', err);
      const statusCode = err.statusCode || 500;
      return res.status(statusCode).json({ error: err.message || 'Could not fetch habits' });
    }
  }

  // Get a habit by ID
  static async getHabitById(req: Request, res: Response) {
    try {
      const user = req.user as { userId: string };
      if (!user?.userId) throw new Error('User not authenticated');
      const userId = user.userId;
      const habitId = req.params.id;

      if (!habitId || !userId) {
        return res.status(400).json({ error: 'User ID and Habit ID are required' });
      }

      const habit = await HabitService.getHabitById(userId, habitId);

      return res.status(200).json({ habit });
    } catch (err: any) {
      console.error('Get habit error:', err);
      const statusCode = err.statusCode || 500;
      return res.status(statusCode).json({ error: err.message || 'Habit not found' });
    }
  }

  // Update habit details
  static async updateHabit(req: Request, res: Response) {
    try {
      const user = req.user as { userId: string };
      if (!user?.userId) throw new Error('User not authenticated');
      const userId = user.userId;
      const habitId = req.params.id;
      const updates = req.body;

      if (!habitId || !userId) {
        return res.status(400).json({ error: 'User ID and Habit ID are required' });
      }

      const updatedHabit = await HabitService.updateHabit(userId, habitId, updates);
      return res.status(200).json({
        message: 'Habit updated successfully',
        habit: updatedHabit,
      });
    } catch (err: any) {
      console.error('Update habit error:', err);
      const statusCode = err.statusCode || 500;
      return res.status(statusCode).json({ error: err.message || 'Could not update habit' });
    }
  }

  // Archive a habit (soft delete)
  static async archiveHabit(req: Request, res: Response) {
    try {
      const user = req.user as { userId: string };
      if (!user?.userId) throw new Error('User not authenticated');
      const userId = user.userId;
      const habitId = req.params.id;

      if (!userId || !habitId) {
        return res.status(400).json({ error: 'User ID and Habit ID are required' });
      }

      const archivedHabit = await HabitService.archiveHabit(userId, habitId);
      return res.status(200).json({
        message: 'Habit archived successfully',
        habit: archivedHabit,
      });
    } catch (err: any) {
      console.error('Archive habit error:', err);
      const statusCode = err.statusCode || 500;
      return res.status(statusCode).json({ error: err.message || 'Could not archive habit' });
    }
  }

  // Unarchive a habit
  static async unarchiveHabit(req: Request, res: Response) {
    try {
      const user = req.user as { userId: string };
      if (!user?.userId) throw new Error('User not authenticated');
      const userId = user.userId;
      const habitId = req.params.id;

      if (!userId || !habitId) {
        return res.status(400).json({ error: 'User ID and Habit ID are required' });
      }

      const unarchivedHabit = await HabitService.unarchiveHabit(userId, habitId);
      return res.status(200).json({
        message: 'Habit unarchived successfully',
        habit: unarchivedHabit,
      });
    } catch (err: any) {
      console.error('Unarchive habit error:', err);
      const statusCode = err.statusCode || 500;
      return res.status(statusCode).json({ error: err.message || 'Could not unarchive habit' });
    }
  }

  // Permanently delete a habit
  static async deleteHabit(req: Request, res: Response) {
    try {
      const user = req.user as { userId: string };
      if (!user?.userId) throw new Error('User not authenticated');
      const userId = user.userId;
      const habitId = req.params.id;

      const result = await HabitService.deleteHabit(userId, habitId);
      return res.status(200).json(result);
    } catch (err: any) {
      console.error('Delete habit error:', err);
      const statusCode = err.statusCode || 500;
      return res.status(statusCode).json({ error: err.message || 'Could not delete habit' });
    }
  }

  static async checkInHabit(req: Request, res: Response) {
    try {
      const user = req.user as { userId: string };

      const userId = user?.userId;
      if (!userId) {
        return res.status(400).json({ error: 'User not authenticated' });
      }
      const habitId = req.params.id;
      const { sourceId, notes } = req.body;

      if (!habitId) {
        return res.status(400).json({ error: 'habitId is required' });
      }

      const result = await HabitService.checkInHabit({
        userId,
        habitId,
        sourceId,
        notes,
      });
      return res.status(200).json(result);
    } catch (err: any) {
      console.error('Check-in error:', err);
      const statusCode = err.statusCode || 500;
      return res.status(statusCode).json({ error: err.message || 'Check-in failed' });
    }
  }

  static async getHabitsByFrequency(req: Request, res: Response) {
    try {
      const user = req.user as { userId: string };
      if (!user?.userId) throw new Error('User not authenticated');
      const userId = user.userId;
      const frequency = req.params.frequency;

      const habits = await HabitService.getHabitsByFrequency(userId, frequency as HabitFrequency);
      return res.status(200).json({ habits });
    } catch (err: any) {
      console.error('Get habits by frequency error:', err);
      const statusCode = err.statusCode || 500;
      return res.status(statusCode).json({ error: err.message || 'Could not fetch habits' });
    }
  }

  static async getHabitsByCategory(req: Request, res: Response) {
    try {
      const user = req.user as { userId: string };
      if (!user?.userId) throw new Error('User not authenticated');
      const userId = user.userId;
      const category = req.params.category;
      const habits = await HabitService.getHabitsByCategory(userId, category as Category);
      return res.status(200).json({ habits });
    } catch (err: any) {
      console.error('Get habits by category error:', err);
      const statusCode = err.statusCode || 500;
      return res
        .status(statusCode)
        .json({ error: err.message || 'Could not fetch habits by category' });
    }
  }

  static async getArchivedHabits(req: Request, res: Response) {
    try {
      const user = req.user as { userId: string };
      if (!user?.userId) throw new Error('User not authenticated');
      const userId = user.userId;

      const archivedHabits = await HabitService.getArchivedHabits(userId);
      return res.status(200).json({ archivedHabits });
    } catch (err: any) {
      console.error('Get archived habits error:', err);
      const statusCode = err.statusCode || 500;
      return res
        .status(statusCode)
        .json({ error: err.message || 'Could not fetch archived habits' });
    }
  }

  static async getHabitCount(req: Request, res: Response) {
    try {
      const user = req.user as { userId: string };
      if (!user?.userId) throw new Error('User not authenticated');
      const userId = user.userId;

      const count = await HabitService.getHabitCount(userId);
      return res.status(200).json({ count });
    } catch (err: any) {
      console.error('Get habit count error:', err);
      const statusCode = err.statusCode || 500;
      return res.status(statusCode).json({ error: err.message || 'Could not fetch habit count' });
    }
  }

  static async getArchivedHabitCount(req: Request, res: Response) {
    try {
      const user = req.user as { userId: string };
      if (!user?.userId) throw new Error('User not authenticated');
      const userId = user.userId;

      const count = await HabitService.getArchivedHabitCount(userId);
      return res.status(200).json({ count });
    } catch (err: any) {
      console.error('Get archived habit count error:', err);
      const statusCode = err.statusCode || 500;
      return res
        .status(statusCode)
        .json({ error: err.message || 'Could not fetch archived habit count' });
    }
  }

  static async getHabitByName(req: Request, res: Response) {
    try {
      const user = req.user as { userId: string };
      if (!user?.userId) throw new Error('User not authenticated');
      const userId = user.userId;
      const { name } = req.query;

      if (!name) {
        return res.status(400).json({ error: 'Name is required' });
      }

      const habit = await HabitService.getHabitByName(userId, name as string);
      return res.status(200).json({ habit });
    } catch (err: any) {
      console.error('Get habit by name error:', err);
      const statusCode = err.statusCode || 500;
      return res.status(statusCode).json({ error: err.message || 'Could not fetch habit by name' });
    }
  }

  static async searchHabits(req: Request, res: Response) {
    try {
      const user = req.user as { userId: string };
      if (!user?.userId) throw new Error('User not authenticated');
      const userId = user.userId;
      const { query } = req.query;

      if (!query) {
        return res.status(400).json({ error: 'Search query is required' });
      }

      const habits = await HabitService.searchHabits(userId, query as string);
      return res.status(200).json({ habits });
    } catch (err: any) {
      console.error('Search habits error:', err);
      const statusCode = err.statusCode || 500;
      return res.status(statusCode).json({ error: err.message || 'Could not search habits' });
    }
  }
}
