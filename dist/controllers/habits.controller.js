"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HabitController = void 0;
const habit_service_1 = require("../services/habit.service");
class HabitController {
    static async createHabit(req, res) {
        try {
            const user = req.user;
            if (!user?.userId)
                throw new Error('User not authenticated');
            const userId = user.userId;
            if (!userId) {
                return res.status(400).json({ error: 'User ID is required' });
            }
            const { name, description, frequency, goalPerPeriod, difficulty, category, xpReward, coinReward, daysOfWeek, } = req.body;
            if (!name || !goalPerPeriod) {
                return res.status(400).json({ error: 'Name and goal per period are required' });
            }
            if (goalPerPeriod < 1) {
                return res.status(400).json({ error: 'Goal per period must be at least 1' });
            }
            if (daysOfWeek) {
                const invalidDay = daysOfWeek.some((day) => day < 0 || day > 6);
                if (invalidDay) {
                    return res.status(400).json({ error: 'daysOfWeek must contain values between 0 and 6' });
                }
            }
            if (!frequency || !difficulty || !category) {
                return res.status(400).json({ error: 'Frequency, difficulty, and category are required' });
            }
            const habit = await habit_service_1.HabitService.createHabit(userId, {
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
        }
        catch (err) {
            console.error('Create habit error:', err);
            const statusCode = err.statusCode || 500;
            return res.status(statusCode).json({ error: err.message || 'Could not create habit' });
        }
    }
    static async getAllHabits(req, res) {
        try {
            const user = req.user;
            if (!user?.userId)
                throw new Error('User not authenticated');
            const userId = user.userId;
            if (!userId) {
                return res.status(400).json({ error: 'User ID is required' });
            }
            const habits = await habit_service_1.HabitService.getAllHabits(userId);
            return res.status(200).json({ habits });
        }
        catch (err) {
            console.error('Get habits error:', err);
            const statusCode = err.statusCode || 500;
            return res.status(statusCode).json({ error: err.message || 'Could not fetch habits' });
        }
    }
    static async getHabitById(req, res) {
        try {
            const user = req.user;
            if (!user?.userId)
                throw new Error('User not authenticated');
            const userId = user.userId;
            const habitId = req.params.id;
            if (!habitId || !userId) {
                return res.status(400).json({ error: 'User ID and Habit ID are required' });
            }
            const habit = await habit_service_1.HabitService.getHabitById(userId, habitId);
            return res.status(200).json({ habit });
        }
        catch (err) {
            console.error('Get habit error:', err);
            const statusCode = err.statusCode || 500;
            return res.status(statusCode).json({ error: err.message || 'Habit not found' });
        }
    }
    static async updateHabit(req, res) {
        try {
            const user = req.user;
            if (!user?.userId)
                throw new Error('User not authenticated');
            const userId = user.userId;
            const habitId = req.params.id;
            const updates = req.body;
            if (!habitId || !userId) {
                return res.status(400).json({ error: 'User ID and Habit ID are required' });
            }
            const updatedHabit = await habit_service_1.HabitService.updateHabit(userId, habitId, updates);
            return res.status(200).json({
                message: 'Habit updated successfully',
                habit: updatedHabit,
            });
        }
        catch (err) {
            console.error('Update habit error:', err);
            const statusCode = err.statusCode || 500;
            return res.status(statusCode).json({ error: err.message || 'Could not update habit' });
        }
    }
    static async archiveHabit(req, res) {
        try {
            const user = req.user;
            if (!user?.userId)
                throw new Error('User not authenticated');
            const userId = user.userId;
            const habitId = req.params.id;
            if (!userId || !habitId) {
                return res.status(400).json({ error: 'User ID and Habit ID are required' });
            }
            const archivedHabit = await habit_service_1.HabitService.archiveHabit(userId, habitId);
            return res.status(200).json({
                message: 'Habit archived successfully',
                habit: archivedHabit,
            });
        }
        catch (err) {
            console.error('Archive habit error:', err);
            const statusCode = err.statusCode || 500;
            return res.status(statusCode).json({ error: err.message || 'Could not archive habit' });
        }
    }
    static async unarchiveHabit(req, res) {
        try {
            const user = req.user;
            if (!user?.userId)
                throw new Error('User not authenticated');
            const userId = user.userId;
            const habitId = req.params.id;
            if (!userId || !habitId) {
                return res.status(400).json({ error: 'User ID and Habit ID are required' });
            }
            const unarchivedHabit = await habit_service_1.HabitService.unarchiveHabit(userId, habitId);
            return res.status(200).json({
                message: 'Habit unarchived successfully',
                habit: unarchivedHabit,
            });
        }
        catch (err) {
            console.error('Unarchive habit error:', err);
            const statusCode = err.statusCode || 500;
            return res.status(statusCode).json({ error: err.message || 'Could not unarchive habit' });
        }
    }
    static async deleteHabit(req, res) {
        try {
            const user = req.user;
            if (!user?.userId)
                throw new Error('User not authenticated');
            const userId = user.userId;
            const habitId = req.params.id;
            const result = await habit_service_1.HabitService.deleteHabit(userId, habitId);
            return res.status(200).json(result);
        }
        catch (err) {
            console.error('Delete habit error:', err);
            const statusCode = err.statusCode || 500;
            return res.status(statusCode).json({ error: err.message || 'Could not delete habit' });
        }
    }
    static async checkInHabit(req, res) {
        try {
            const user = req.user;
            const apiKey = req.body.apiKey;
            const userId = user?.userId;
            if (!userId) {
                return res.status(400).json({ error: 'User not authenticated' });
            }
            if (!apiKey) {
                return res.status(400).json({ error: 'API key is required' });
            }
            if (!req.params.id) {
                return res.status(400).json({ error: 'Habit ID is required' });
            }
            const habitId = req.params.id;
            const { sourceId, notes } = req.body;
            if (!habitId) {
                return res.status(400).json({ error: 'habitId is required' });
            }
            const result = await habit_service_1.HabitService.checkInHabit({
                userId,
                habitId,
                sourceId,
                notes,
                apiKey: apiKey,
            });
            return res.status(200).json(result);
        }
        catch (err) {
            console.error('Check-in error:', err);
            const statusCode = err.statusCode || 500;
            return res.status(statusCode).json({ error: err.message || 'Check-in failed' });
        }
    }
    static async getHabitsByFrequency(req, res) {
        try {
            const user = req.user;
            if (!user?.userId)
                throw new Error('User not authenticated');
            const userId = user.userId;
            const frequency = req.params.frequency;
            const habits = await habit_service_1.HabitService.getHabitsByFrequency(userId, frequency);
            return res.status(200).json({ habits });
        }
        catch (err) {
            console.error('Get habits by frequency error:', err);
            const statusCode = err.statusCode || 500;
            return res.status(statusCode).json({ error: err.message || 'Could not fetch habits' });
        }
    }
    static async getHabitsByCategory(req, res) {
        try {
            const user = req.user;
            if (!user?.userId)
                throw new Error('User not authenticated');
            const userId = user.userId;
            const category = req.params.category;
            const habits = await habit_service_1.HabitService.getHabitsByCategory(userId, category);
            return res.status(200).json({ habits });
        }
        catch (err) {
            console.error('Get habits by category error:', err);
            const statusCode = err.statusCode || 500;
            return res
                .status(statusCode)
                .json({ error: err.message || 'Could not fetch habits by category' });
        }
    }
    static async getArchivedHabits(req, res) {
        try {
            const user = req.user;
            if (!user?.userId)
                throw new Error('User not authenticated');
            const userId = user.userId;
            const archivedHabits = await habit_service_1.HabitService.getArchivedHabits(userId);
            return res.status(200).json({ archivedHabits });
        }
        catch (err) {
            console.error('Get archived habits error:', err);
            const statusCode = err.statusCode || 500;
            return res
                .status(statusCode)
                .json({ error: err.message || 'Could not fetch archived habits' });
        }
    }
    static async getHabitCount(req, res) {
        try {
            const user = req.user;
            if (!user?.userId)
                throw new Error('User not authenticated');
            const userId = user.userId;
            const count = await habit_service_1.HabitService.getHabitCount(userId);
            return res.status(200).json({ count });
        }
        catch (err) {
            console.error('Get habit count error:', err);
            const statusCode = err.statusCode || 500;
            return res.status(statusCode).json({ error: err.message || 'Could not fetch habit count' });
        }
    }
    static async getArchivedHabitCount(req, res) {
        try {
            const user = req.user;
            if (!user?.userId)
                throw new Error('User not authenticated');
            const userId = user.userId;
            const count = await habit_service_1.HabitService.getArchivedHabitCount(userId);
            return res.status(200).json({ count });
        }
        catch (err) {
            console.error('Get archived habit count error:', err);
            const statusCode = err.statusCode || 500;
            return res
                .status(statusCode)
                .json({ error: err.message || 'Could not fetch archived habit count' });
        }
    }
    static async getHabitByName(req, res) {
        try {
            const user = req.user;
            if (!user?.userId)
                throw new Error('User not authenticated');
            const userId = user.userId;
            const { name } = req.query;
            if (!name) {
                return res.status(400).json({ error: 'Name is required' });
            }
            const habit = await habit_service_1.HabitService.getHabitByName(userId, name);
            return res.status(200).json({ habit });
        }
        catch (err) {
            console.error('Get habit by name error:', err);
            const statusCode = err.statusCode || 500;
            return res.status(statusCode).json({ error: err.message || 'Could not fetch habit by name' });
        }
    }
    static async searchHabits(req, res) {
        try {
            const user = req.user;
            if (!user?.userId)
                throw new Error('User not authenticated');
            const userId = user.userId;
            const { query } = req.query;
            if (!query) {
                return res.status(400).json({ error: 'Search query is required' });
            }
            const habits = await habit_service_1.HabitService.searchHabits(userId, query);
            return res.status(200).json({ habits });
        }
        catch (err) {
            console.error('Search habits error:', err);
            const statusCode = err.statusCode || 500;
            return res.status(statusCode).json({ error: err.message || 'Could not search habits' });
        }
    }
}
exports.HabitController = HabitController;
//# sourceMappingURL=habits.controller.js.map