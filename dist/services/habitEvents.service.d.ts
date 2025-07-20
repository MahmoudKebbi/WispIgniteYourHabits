import { HabitEvent } from '../models/HabitEvent';
export declare class HabitEventsService {
    static getEventsByUser(userId: string, filters?: {
        habitId?: string;
        startDate?: string;
        endDate?: string;
    }): Promise<HabitEvent[]>;
    static getAllHabitEvents(userId: string): Promise<HabitEvent[]>;
    static getEventsByHabitId(userId: string, habitId: string): Promise<HabitEvent[]>;
    static filterHabitEvents(userId: string, from?: Date, to?: Date): Promise<HabitEvent[]>;
    static deleteHabitEvent(userId: string, eventId: string): Promise<{
        message: string;
    }>;
}
