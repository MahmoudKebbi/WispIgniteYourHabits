import { HabitEvent } from '../models/HabitEvent';
import { AppDataSource } from '../repositories/db';
import { createError } from '../utils/errorHandler';

export class HabitEventsService {
  static async getEventsByUser(
    userId: string,
    filters?: {
      habitId?: string;
      startDate?: string;
      endDate?: string;
    }
  ) {
    const eventRepo = AppDataSource.getRepository(HabitEvent);

    if (!userId) {
      throw createError('User ID is required', 400);
    }
    if (filters?.startDate && isNaN(Date.parse(filters.startDate))) {
      throw createError('Invalid start date format', 400);
    }
    if (
      filters?.startDate &&
      filters?.endDate &&
      new Date(filters.startDate) > new Date(filters.endDate)
    ) {
      throw createError('Start date cannot be after end date', 400);
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

  static async getAllHabitEvents(userId: string) {
    const repo = AppDataSource.getRepository(HabitEvent);
    if (!userId) {
      throw createError('User ID is required', 400);
    }

    return repo.find({
      where: { user: { id: userId } },
      relations: ['habit', 'source'],
      order: { completed_at: 'DESC' },
    });
  }

  static async getEventsByHabitId(userId: string, habitId: string) {
    if (!userId) {
      throw createError('User ID is required', 400);
    }
    if (!habitId) {
      throw createError('Habit ID is required', 400);
    }
    const repo = AppDataSource.getRepository(HabitEvent);

    return repo.find({
      where: { user: { id: userId }, habit: { id: habitId } },
      relations: ['habit', 'source'],
      order: { completed_at: 'DESC' },
    });
  }

  static async filterHabitEvents(userId: string, from?: Date, to?: Date) {
    const repo = AppDataSource.getRepository(HabitEvent);
    if (!userId) {
      throw createError('User ID is required', 400);
    }
    if (from && isNaN(Date.parse(from.toString()))) {
      throw createError('Invalid from date format', 400);
    }
    if (to && isNaN(Date.parse(to.toString()))) {
      throw createError('Invalid to date format', 400);
    }
    if (from && to && from > to) {
      throw createError('From date cannot be after to date', 400);
    }

    const query = repo
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.habit', 'habit')
      .leftJoinAndSelect('event.source', 'source')
      .where('event.user_id = :userId', { userId });

    if (from) query.andWhere('event.completed_at >= :from', { from });
    if (to) query.andWhere('event.completed_at <= :to', { to });

    return query.orderBy('event.completed_at', 'DESC').getMany();
  }

  static async deleteHabitEvent(userId: string, eventId: string) {
    const repo = AppDataSource.getRepository(HabitEvent);
    const event = await repo.findOne({ where: { id: eventId }, relations: ['user'] });
    if (!userId) {
      throw createError('User ID is required', 400);
    }
    if (!eventId) {
      throw createError('Event ID is required', 400);
    }
    if (!event) {
      throw createError('Event not found', 404);
    }
    if (!event.user) {
      throw createError('Event does not belong to any user', 404);
    }

    if (!event || event.user.id !== userId) {
      throw new Error('Not authorized or event not found');
    }

    await repo.remove(event);
    return { message: 'Event deleted' };
  }
}
