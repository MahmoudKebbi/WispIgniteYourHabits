import { AppDataSource } from '../repositories/db';
import { Habit } from '../models/Habit';
import { User } from '../models/User';

export class HabitService {
  static async createHabit(userId: string, data: {
    name: string;
    description?: string;
    frequency?: 'daily' | 'weekly' | 'custom';
    goalPerPeriod: number;
    xpReward?: number;
    coinReward?: number;
    daysOfWeek?: number[];
  }) {
    const habitRepo = AppDataSource.getRepository(Habit);
    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.findOne({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    if (data.goalPerPeriod < 1) {
      throw new Error('Goal per period must be at least 1');
    }

    if (data.daysOfWeek) {
      const invalid = data.daysOfWeek.some(day => day < 0 || day > 6);
      if (invalid) throw new Error('daysOfWeek must contain values between 0 and 6');
    }

    const habit = habitRepo.create({
      user,
      name: data.name,
      description: data.description,
      frequency: data.frequency || 'daily',
      goal_per_period: data.goalPerPeriod,
      xp_reward: data.xpReward ?? 10,
      coin_reward: data.coinReward ?? 5,
      days_of_week: data.daysOfWeek,
    });

    await habitRepo.save(habit);

    return habit;
  }
}
