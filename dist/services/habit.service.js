"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HabitService = void 0;
const db_1 = require("../repositories/db");
const Habit_1 = require("../models/Habit");
const User_1 = require("../models/User");
const HabitEvent_1 = require("../models/HabitEvent");
const CoinTransaction_1 = require("../models/CoinTransaction");
const XPTransaction_1 = require("../models/XPTransaction");
const Source_1 = require("../models/Source");
const typeorm_1 = require("typeorm");
const errorHandler_1 = require("../utils/errorHandler"); // Assuming you have a utility for error handling
const XP_REWARDS_BY_DIFFICULTY = {
    very_easy: 5,
    easy: 10,
    medium: 20,
    hard: 40,
    epic: 80,
};
const COIN_REWARDS_BY_DIFFICULTY = {
    very_easy: 2,
    easy: 5,
    medium: 10,
    hard: 20,
    epic: 40,
};
const VALID_DIFFICULTIES = ['very_easy', 'easy', 'medium', 'hard', 'epic'];
const VALID_CATEGORIES = [
    'health',
    'productivity',
    'self_care',
    'chores',
    'creativity',
];
class HabitService {
    static async createHabit(userId, data) {
        const habitRepo = db_1.AppDataSource.getRepository(Habit_1.Habit);
        const userRepo = db_1.AppDataSource.getRepository(User_1.User);
        const user = await userRepo.findOne({ where: { id: userId } });
        if (!user)
            throw (0, errorHandler_1.createError)('User not found', 404);
        if (data.goalPerPeriod < 1) {
            throw (0, errorHandler_1.createError)('Goal per period must be at least 1', 400);
        }
        if (data.daysOfWeek) {
            const invalidDay = data.daysOfWeek.some((day) => day < 0 || day > 6);
            if (invalidDay)
                throw (0, errorHandler_1.createError)('daysOfWeek must contain values between 0 and 6', 400);
        }
        if (data.difficulty && !VALID_DIFFICULTIES.includes(data.difficulty)) {
            throw (0, errorHandler_1.createError)(`Invalid difficulty: ${data.difficulty}`, 400);
        }
        if (data.category && !VALID_CATEGORIES.includes(data.category)) {
            throw (0, errorHandler_1.createError)(`Invalid category: ${data.category}`, 400);
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
    static async getAllHabits(userId) {
        const habitRepo = db_1.AppDataSource.getRepository(Habit_1.Habit);
        return habitRepo.find({
            where: { user: { id: userId }, is_archived: false },
            order: { created_at: 'DESC' },
        });
    }
    static async getHabitById(userId, habitId) {
        const habitRepo = db_1.AppDataSource.getRepository(Habit_1.Habit);
        const habit = await habitRepo.findOne({
            where: { id: habitId, user: { id: userId } },
        });
        if (!habit)
            throw (0, errorHandler_1.createError)('Habit not found', 404);
        return { id: habit.id };
    }
    static async updateHabit(userId, habitId, updates) {
        const habitRepo = db_1.AppDataSource.getRepository(Habit_1.Habit);
        const habit = await habitRepo.findOne({
            where: { id: habitId },
            relations: ['user'],
        });
        if (!habit)
            throw (0, errorHandler_1.createError)('Habit not found', 404);
        if (habit.user.id !== userId)
            throw (0, errorHandler_1.createError)('You do not have permission to update this habit', 403);
        if (updates.difficulty && !VALID_DIFFICULTIES.includes(updates.difficulty)) {
            throw (0, errorHandler_1.createError)(`Invalid difficulty: ${updates.difficulty}`, 400);
        }
        if (updates.category && !VALID_CATEGORIES.includes(updates.category)) {
            throw (0, errorHandler_1.createError)(`Invalid category: ${updates.category}`, 400);
        }
        if (updates.goal_per_period !== undefined && updates.goal_per_period < 1) {
            throw (0, errorHandler_1.createError)('Goal per period must be at least 1', 400);
        }
        if (updates.days_of_week) {
            const invalidDay = updates.days_of_week.some((day) => day < 0 || day > 6);
            if (invalidDay)
                throw (0, errorHandler_1.createError)('daysOfWeek must contain values between 0 and 6', 400);
        }
        Object.assign(habit, updates);
        if (updates.difficulty &&
            updates.xp_reward === undefined &&
            updates.coin_reward === undefined) {
            habit.xp_reward = XP_REWARDS_BY_DIFFICULTY[updates.difficulty];
            habit.coin_reward = COIN_REWARDS_BY_DIFFICULTY[updates.difficulty];
        }
        const updated = await habitRepo.save(habit);
        return updated;
    }
    static async archiveHabit(userId, habitId) {
        const habitRepo = db_1.AppDataSource.getRepository(Habit_1.Habit);
        const habit = await habitRepo.findOne({
            where: { id: habitId },
            relations: ['user'],
        });
        if (!habit)
            throw (0, errorHandler_1.createError)('Habit not found', 404);
        if (habit.user.id !== userId)
            throw (0, errorHandler_1.createError)('You do not have permission to archive this habit', 403);
        habit.is_archived = true;
        await habitRepo.save(habit);
        return { id: habit.id };
    }
    static async unarchiveHabit(userId, habitId) {
        const habitRepo = db_1.AppDataSource.getRepository(Habit_1.Habit);
        const habit = await habitRepo.findOne({
            where: { id: habitId },
            relations: ['user'],
        });
        if (!habit)
            throw (0, errorHandler_1.createError)('Habit not found', 404);
        if (habit.user.id !== userId)
            throw (0, errorHandler_1.createError)('You do not have permission to unarchive this habit', 403);
        habit.is_archived = false;
        await habitRepo.save(habit);
        return { id: habit.id };
    }
    static async deleteHabit(userId, habitId) {
        const habitRepo = db_1.AppDataSource.getRepository(Habit_1.Habit);
        const habit = await habitRepo.findOne({
            where: { id: habitId },
            relations: ['user'],
        });
        if (!habit)
            throw (0, errorHandler_1.createError)('Habit not found', 404);
        if (habit.user.id !== userId)
            throw (0, errorHandler_1.createError)('You do not have permission to delete this habit', 403);
        await habitRepo.remove(habit);
        return { message: 'Habit deleted successfully' };
    }
    static async getHabitsByFrequency(userId, frequency) {
        const habitRepo = db_1.AppDataSource.getRepository(Habit_1.Habit);
        return habitRepo.find({
            where: { user: { id: userId }, frequency, is_archived: false },
            order: { created_at: 'DESC' },
        });
    }
    static async getHabitsByCategory(userId, category) {
        const habitRepo = db_1.AppDataSource.getRepository(Habit_1.Habit);
        return habitRepo.find({
            where: { user: { id: userId }, category, is_archived: false },
            order: { created_at: 'DESC' },
        });
    }
    static async getArchivedHabits(userId) {
        const habitRepo = db_1.AppDataSource.getRepository(Habit_1.Habit);
        return habitRepo.find({
            where: { user: { id: userId }, is_archived: true },
            order: { created_at: 'DESC' },
        });
    }
    static async getHabitCount(userId) {
        const habitRepo = db_1.AppDataSource.getRepository(Habit_1.Habit);
        return habitRepo.count({
            where: { user: { id: userId }, is_archived: false },
        });
    }
    static async getArchivedHabitCount(userId) {
        const habitRepo = db_1.AppDataSource.getRepository(Habit_1.Habit);
        return habitRepo.count({
            where: { user: { id: userId }, is_archived: true },
        });
    }
    static async getHabitByName(userId, name) {
        const habitRepo = db_1.AppDataSource.getRepository(Habit_1.Habit);
        return habitRepo.findOne({
            where: { user: { id: userId }, name, is_archived: false },
        });
    }
    static async checkInHabit({ userId, habitId, sourceId, notes, apiKey, }) {
        const habitRepo = db_1.AppDataSource.getRepository(Habit_1.Habit);
        const eventRepo = db_1.AppDataSource.getRepository(HabitEvent_1.HabitEvent);
        const coinRepo = db_1.AppDataSource.getRepository(CoinTransaction_1.CoinTransaction);
        const xpRepo = db_1.AppDataSource.getRepository(XPTransaction_1.XpTransaction);
        const sourceRepo = db_1.AppDataSource.getRepository(Source_1.Source);
        const habit = await habitRepo.findOne({ where: { id: habitId }, relations: ['user'] });
        if (!habit)
            throw (0, errorHandler_1.createError)('Habit not found', 404);
        if (habit.user.id !== userId)
            throw (0, errorHandler_1.createError)('You do not have permission to check in this habit', 403);
        let source;
        if (sourceId) {
            source = await sourceRepo.findOneBy({ id: sourceId });
            if (!source)
                throw (0, errorHandler_1.createError)('Invalid source', 404);
            if (source.api_key !== apiKey) {
                throw (0, errorHandler_1.createError)('Invalid source API key', 401);
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
    static async searchHabits(userId, query) {
        if (!query || query.trim().length === 0) {
            throw (0, errorHandler_1.createError)('Search query cannot be empty', 400);
        }
        const habitRepo = db_1.AppDataSource.getRepository(Habit_1.Habit);
        const habits = await habitRepo.find({
            where: [
                { user: { id: userId }, name: (0, typeorm_1.ILike)(`%${query}%`), is_archived: false },
                {
                    user: { id: userId },
                    description: (0, typeorm_1.ILike)(`%${query}%`),
                    is_archived: false,
                },
            ],
            order: { created_at: 'DESC' },
        });
        return habits;
    }
}
exports.HabitService = HabitService;
