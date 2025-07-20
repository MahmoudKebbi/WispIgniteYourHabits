"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HabitEventsService = void 0;
const HabitEvent_1 = require("../models/HabitEvent");
const db_1 = require("../repositories/db");
const errorHandler_1 = require("../utils/errorHandler");
class HabitEventsService {
    static async getEventsByUser(userId, filters) {
        const eventRepo = db_1.AppDataSource.getRepository(HabitEvent_1.HabitEvent);
        if (!userId) {
            throw (0, errorHandler_1.createError)('User ID is required', 400);
        }
        if (filters?.startDate && isNaN(Date.parse(filters.startDate))) {
            throw (0, errorHandler_1.createError)('Invalid start date format', 400);
        }
        if (filters?.startDate &&
            filters?.endDate &&
            new Date(filters.startDate) > new Date(filters.endDate)) {
            throw (0, errorHandler_1.createError)('Start date cannot be after end date', 400);
        }
        const query = eventRepo
            .createQueryBuilder('event')
            .leftJoinAndSelect('event.habit', 'habit')
            .leftJoinAndSelect('event.source', 'source')
            .where('event.user_id = :userId', { userId });
        if (filters?.habitId) {
            query.andWhere('event.habit_id = :habitId', { habitId: filters.habitId });
        }
        if (filters?.startDate) {
            query.andWhere('event.completed_at >= :startDate', {
                startDate: new Date(filters.startDate),
            });
        }
        if (filters?.endDate) {
            query.andWhere('event.completed_at <= :endDate', { endDate: new Date(filters.endDate) });
        }
        return query.orderBy('event.completed_at', 'DESC').getMany();
    }
    static async getAllHabitEvents(userId) {
        const repo = db_1.AppDataSource.getRepository(HabitEvent_1.HabitEvent);
        if (!userId) {
            throw (0, errorHandler_1.createError)('User ID is required', 400);
        }
        return repo.find({
            where: { user: { id: userId } },
            relations: ['habit', 'source'],
            order: { completed_at: 'DESC' },
        });
    }
    static async getEventsByHabitId(userId, habitId) {
        if (!userId) {
            throw (0, errorHandler_1.createError)('User ID is required', 400);
        }
        if (!habitId) {
            throw (0, errorHandler_1.createError)('Habit ID is required', 400);
        }
        const repo = db_1.AppDataSource.getRepository(HabitEvent_1.HabitEvent);
        return repo.find({
            where: { user: { id: userId }, habit: { id: habitId } },
            relations: ['habit', 'source'],
            order: { completed_at: 'DESC' },
        });
    }
    static async filterHabitEvents(userId, from, to) {
        const repo = db_1.AppDataSource.getRepository(HabitEvent_1.HabitEvent);
        if (!userId) {
            throw (0, errorHandler_1.createError)('User ID is required', 400);
        }
        if (from && isNaN(Date.parse(from.toString()))) {
            throw (0, errorHandler_1.createError)('Invalid from date format', 400);
        }
        if (to && isNaN(Date.parse(to.toString()))) {
            throw (0, errorHandler_1.createError)('Invalid to date format', 400);
        }
        if (from && to && from > to) {
            throw (0, errorHandler_1.createError)('From date cannot be after to date', 400);
        }
        const query = repo
            .createQueryBuilder('event')
            .leftJoinAndSelect('event.habit', 'habit')
            .leftJoinAndSelect('event.source', 'source')
            .where('event.user_id = :userId', { userId });
        if (from)
            query.andWhere('event.completed_at >= :from', { from });
        if (to)
            query.andWhere('event.completed_at <= :to', { to });
        return query.orderBy('event.completed_at', 'DESC').getMany();
    }
    static async deleteHabitEvent(userId, eventId) {
        const repo = db_1.AppDataSource.getRepository(HabitEvent_1.HabitEvent);
        const event = await repo.findOne({ where: { id: eventId }, relations: ['user'] });
        if (!userId) {
            throw (0, errorHandler_1.createError)('User ID is required', 400);
        }
        if (!eventId) {
            throw (0, errorHandler_1.createError)('Event ID is required', 400);
        }
        if (!event) {
            throw (0, errorHandler_1.createError)('Event not found', 404);
        }
        if (!event.user) {
            throw (0, errorHandler_1.createError)('Event does not belong to any user', 404);
        }
        if (!event || event.user.id !== userId) {
            throw new Error('Not authorized or event not found');
        }
        await repo.remove(event);
        return { message: 'Event deleted' };
    }
}
exports.HabitEventsService = HabitEventsService;
//# sourceMappingURL=habitEvents.service.js.map