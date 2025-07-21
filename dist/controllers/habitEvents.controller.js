"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HabitEventsController = void 0;
const habitEvents_service_1 = require("../services/habitEvents.service");
class HabitEventsController {
    static async getHabitEventsByUser(req, res) {
        try {
            const user = req.user;
            const userId = user.userId;
            if (!userId) {
                console.error('User not authenticated');
                return res.status(400).json({ error: 'User not authenticated' });
            }
            const { habitId, startDate, endDate } = req.query;
            if (!habitId) {
                return res.status(400).json({ error: 'Habit ID is required' });
            }
            const events = await habitEvents_service_1.HabitEventsService.getEventsByUser(userId, {
                habitId: habitId,
                startDate: startDate,
                endDate: endDate,
            });
            return res.status(200).json({ events });
        }
        catch (err) {
            console.error('Get events error:', err);
            const statusCode = err.statusCode || 500;
            return res.status(statusCode).json({ error: err.message || 'Could not fetch events' });
        }
    }
    static async getAllHabitEvents(req, res) {
        try {
            const user = req.user;
            const userId = user.userId;
            if (!userId) {
                console.error('User not authenticated');
                return res.status(400).json({ error: 'User not authenticated' });
            }
            const events = await habitEvents_service_1.HabitEventsService.getAllHabitEvents(userId);
            return res.status(200).json({ events });
        }
        catch (err) {
            console.error('Get all habit events error:', err);
            const statusCode = err.statusCode || 500;
            return res.status(statusCode).json({ error: err.message || 'Could not fetch events' });
        }
    }
    static async getEventsByHabitId(req, res) {
        try {
            const user = req.user;
            const userId = user.userId;
            if (!userId) {
                console.error('User not authenticated');
                return res.status(400).json({ error: 'User not authenticated' });
            }
            const habitId = req.params.habitId;
            const events = await habitEvents_service_1.HabitEventsService.getEventsByHabitId(userId, habitId);
            return res.status(200).json({ events });
        }
        catch (err) {
            console.error('Get events by habit ID error:', err);
            const statusCode = err.statusCode || 500;
            return res.status(statusCode).json({ error: err.message || 'Could not get habit' });
        }
    }
    static async filterHabitEvents(req, res) {
        try {
            const user = req.user;
            const userId = user.userId;
            if (!userId) {
                console.error('User not authenticated');
                return res.status(400).json({ error: 'User not authenticated' });
            }
            const from = req.query.from ? new Date(req.query.from) : undefined;
            const to = req.query.to ? new Date(req.query.to) : undefined;
            const events = await habitEvents_service_1.HabitEventsService.filterHabitEvents(userId, from, to);
            return res.status(200).json({ events });
        }
        catch (err) {
            console.error('Filter habit events error:', err);
            const statusCode = err.statusCode || 500;
            return res.status(statusCode).json({ error: err.message || 'Could not filter events' });
        }
    }
    static async deleteHabitEvent(req, res) {
        try {
            const user = req.user;
            const userId = user.userId;
            if (!userId) {
                console.error('User not authenticated');
                return res.status(400).json({ error: 'User not authenticated' });
            }
            const eventId = req.params.eventId;
            const result = await habitEvents_service_1.HabitEventsService.deleteHabitEvent(userId, eventId);
            return res.status(200).json(result);
        }
        catch (err) {
            console.error('Delete habit event error:', err);
            const statusCode = err.statusCode || 500;
            return res.status(statusCode).json({ error: err.message || 'Could not delete event' });
        }
    }
}
exports.HabitEventsController = HabitEventsController;
//# sourceMappingURL=habitEvents.controller.js.map