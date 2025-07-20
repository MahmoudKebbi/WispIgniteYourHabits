import { AppDataSource } from '../repositories/db';
import { Habit, HabitFrequency, Difficulty, Category } from '../models/Habit';
import { User } from '../models/User';
import { HabitEvent } from '../models/HabitEvent';
import { CoinTransaction } from '../models/CoinTransaction';
import { XpTransaction } from '../models/XPTransaction';
import { Source } from '../models/Source';
import { ILike } from 'typeorm';
import { createError } from '../utils/errorHandler'; // Assuming you have a utility for error handling

const XP_REWARDS_BY_DIFFICULTY: Record<Difficulty, number> = {
  very_easy: 5,
  easy: 10,
  medium: 20,
  hard: 40,
  epic: 80,
};

const COIN_REWARDS_BY_DIFFICULTY: Record<Difficulty, number> = {
  very_easy: 2,
  easy: 5,
  medium: 10,
  hard: 20,
  epic: 40,
};

const VALID_DIFFICULTIES: Difficulty[] = ['very_easy', 'easy', 'medium', 'hard', 'epic'];
const VALID_CATEGORIES: Category[] = [
  'health',
  'productivity',
  'self_care',
  'chores',
  'creativity',
];

export class HabitService {
  static async createHabit(
    userId: string,
    data: {
      name: string;
      description?: string;
      frequency?: HabitFrequency;
      goalPerPeriod: number;
      difficulty?: Difficulty;
      category?: Category;
      xpReward?: number;
      coinReward?: number;
      daysOfWeek?: number[];
    }
  ) {
    const habitRepo = AppDataSource.getRepository(Habit);
    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.findOne({ where: { id: userId } });
    if (!user) throw createError('User not found', 404);

    if (data.goalPerPeriod < 1) {
      throw createError('Goal per period must be at least 1', 400);
    }

    if (data.daysOfWeek) {
      const invalidDay = data.daysOfWeek.some((day) => day < 0 || day > 6);
      if (invalidDay) throw createError('daysOfWeek must contain values between 0 and 6', 400);
    }

    if (data.difficulty && !VALID_DIFFICULTIES.includes(data.difficulty)) {
      throw createError(`Invalid difficulty: ${data.difficulty}`, 400);
    }

    if (data.category && !VALID_CATEGORIES.includes(data.category)) {
      throw createError(`Invalid category: ${data.category}`, 400);
    }

    
    const difficulty = data.difficulty || 'easy'; // default difficulty if none given
    const xpReward = data.xpReward ?? XP_REWARDS_BY_DIFFICULTY[difficulty];
    const coinReward = data.coinReward ?? COIN_REWARDS_BY_DIFFICULTY[difficulty];

    const habit = habitRepo.create({
      user,
      name: data.name,
      description: data.description,
      frequency: data.frequency || 'daily',
      goal_per_period: data.goalPerPeriod,
      difficulty,
      category: data.category,
      xp_reward: xpReward,
      coin_reward: coinReward,
      days_of_week: data.daysOfWeek,
      is_archived: false,
    });

    await habitRepo.save(habit);
    return { id: habit.id };
  }

  static async getAllHabits(userId: string) {
    const habitRepo = AppDataSource.getRepository(Habit);
    return habitRepo.find({
      where: { user: { id: userId }, is_archived: false },
      order: { created_at: 'DESC' },
    });
  }

  static async getHabitById(userId: string, habitId: string) {
    const habitRepo = AppDataSource.getRepository(Habit);
    const habit = await habitRepo.findOne({
      where: { id: habitId, user: { id: userId } },
    });
    if (!habit) throw createError('Habit not found', 404);
    return { id: habit.id };
  }

  static async updateHabit(
    userId: string,
    habitId: string,
    updates: Partial<Omit<Habit, 'id' | 'user'>>
  ) {
    const habitRepo = AppDataSource.getRepository(Habit);
    const habit = await habitRepo.findOne({
      where: { id: habitId },
      relations: ['user'],
    });
    if (!habit) throw createError('Habit not found', 404);
    if (habit.user.id !== userId)
      throw createError('You do not have permission to update this habit', 403);

    
    if (updates.difficulty && !VALID_DIFFICULTIES.includes(updates.difficulty)) {
      throw createError(`Invalid difficulty: ${updates.difficulty}`, 400);
    }
    if (updates.category && !VALID_CATEGORIES.includes(updates.category)) {
      throw createError(`Invalid category: ${updates.category}`, 400);
    }
    if (updates.goal_per_period !== undefined && updates.goal_per_period < 1) {
      throw createError('Goal per period must be at least 1', 400);
    }
    if (updates.days_of_week) {
      const invalidDay = updates.days_of_week.some((day) => day < 0 || day > 6);
      if (invalidDay) throw createError('daysOfWeek must contain values between 0 and 6', 400);
    }

    
    Object.assign(habit, updates);

    
    if (
      updates.difficulty &&
      updates.xp_reward === undefined &&
      updates.coin_reward === undefined
    ) {
      habit.xp_reward = XP_REWARDS_BY_DIFFICULTY[updates.difficulty];
      habit.coin_reward = COIN_REWARDS_BY_DIFFICULTY[updates.difficulty];
    }

    const updated = await habitRepo.save(habit);
    return updated;
  }

  static async archiveHabit(userId: string, habitId: string) {
      const habitRepo = AppDataSource.getRepository(Habit);
    const habit = await habitRepo.findOne({
      where: { id: habitId },
      relations: ['user'],
    });
    if (!habit) throw createError('Habit not found', 404);
    if (habit.user.id !== userId)
      throw createError('You do not have permission to archive this habit', 403);

    

    habit.is_archived = true;
    await habitRepo.save(habit);
    return { id: habit.id };
  }

  static async unarchiveHabit(userId: string, habitId: string) {
    const habitRepo = AppDataSource.getRepository(Habit);
    const habit = await habitRepo.findOne({
      where: { id: habitId },
      relations: ['user'],
    });
    if (!habit) throw createError('Habit not found', 404);
    if (habit.user.id !== userId)
      throw createError('You do not have permission to unarchive this habit', 403);

    habit.is_archived = false;
    await habitRepo.save(habit);
    return { id: habit.id };
  }

  static async deleteHabit(userId: string, habitId: string) {
    const habitRepo = AppDataSource.getRepository(Habit);
    const habit = await habitRepo.findOne({
      where: { id: habitId },
      relations: ['user'],
    });
    if (!habit) throw createError('Habit not found', 404);
    if (habit.user.id !== userId)
      throw createError('You do not have permission to delete this habit', 403);

    await habitRepo.remove(habit);
    return { message: 'Habit deleted successfully' };
  }

  static async getHabitsByFrequency(userId: string, frequency: HabitFrequency) {
    const habitRepo = AppDataSource.getRepository(Habit);
    return habitRepo.find({
      where: { user: { id: userId }, frequency, is_archived: false },
      order: { created_at: 'DESC' },
    });
  }

  static async getHabitsByCategory(userId: string, category: Category) {
    const habitRepo = AppDataSource.getRepository(Habit);
    return habitRepo.find({
      where: { user: { id: userId }, category, is_archived: false },
      order: { created_at: 'DESC' },
    });
  }

  static async getArchivedHabits(userId: string) {
    const habitRepo = AppDataSource.getRepository(Habit);
    return habitRepo.find({
      where: { user: { id: userId }, is_archived: true },
      order: { created_at: 'DESC' },
    });
  }

  static async getHabitCount(userId: string) {
    const habitRepo = AppDataSource.getRepository(Habit);
    return habitRepo.count({
      where: { user: { id: userId }, is_archived: false },
    });
  }

  static async getArchivedHabitCount(userId: string) {
    const habitRepo = AppDataSource.getRepository(Habit);
    return habitRepo.count({
      where: { user: { id: userId }, is_archived: true },
    });
  }

  static async getHabitByName(userId: string, name: string) {
    const habitRepo = AppDataSource.getRepository(Habit);
    return habitRepo.findOne({
      where: { user: { id: userId }, name, is_archived: false },
    });
  }

  static async checkInHabit({
    userId,
    habitId,
    sourceId,
    notes,
    apiKey,
  }: {
    userId: string;
    habitId: string;
    sourceId?: string;
    notes?: string;
    apiKey?: string;
  }) {
    const habitRepo = AppDataSource.getRepository(Habit);
    const eventRepo = AppDataSource.getRepository(HabitEvent);
    const coinRepo = AppDataSource.getRepository(CoinTransaction);
    const xpRepo = AppDataSource.getRepository(XpTransaction);
    const sourceRepo = AppDataSource.getRepository(Source);

    const habit = await habitRepo.findOne({ where: { id: habitId }, relations: ['user'] });
    if (!habit) throw createError('Habit not found', 404);
    if (habit.user.id !== userId)
      throw createError('You do not have permission to check in this habit', 403);

    let source;
    if (sourceId) {
      source = await sourceRepo.findOneBy({ id: sourceId });
      if (!source) throw createError('Invalid source', 404);
      if (source.api_key !== apiKey) {
        throw createError('Invalid source API key', 401);
      }
    }

    const habitEvent = eventRepo.create({
      user: { id: userId },
      habit: { id: habitId },
      source,
      notes,
      xp_earned: habit.xp_reward,
      coin_earned: habit.coin_reward,
      completed_at: new Date(),
    });

    const coinTransaction = coinRepo.create({
      user: { id: userId },
      amount: habit.coin_reward,
      reason: `Habit check-in: ${habit.name}`,
    });

    const xpTransaction = xpRepo.create({
      user: { id: userId },
      amount: habit.xp_reward,
      reason: `Habit check-in: ${habit.name}`,
    });

    await eventRepo.save(habitEvent);
    await coinRepo.save(coinTransaction);
    await xpRepo.save(xpTransaction);

    return { message: 'Habit checked in successfully', event: habitEvent };
  }

  static async searchHabits(userId: string, query: string) {
    if (!query || query.trim().length === 0) {
      throw createError('Search query cannot be empty', 400);
    }

    const habitRepo = AppDataSource.getRepository(Habit);

    
    const habits = await habitRepo.find({
      where: [
        { user: { id: userId }, name: ILike(`%${query}%`), is_archived: false },
        {
          user: { id: userId },
          description: ILike(`%${query}%`),
          is_archived: false,
        },
      ],
      order: { created_at: 'DESC' },
    });

    return habits;
  }
}
