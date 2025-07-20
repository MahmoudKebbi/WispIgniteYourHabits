import { Habit, HabitFrequency, Difficulty, Category } from '../models/Habit';
import { HabitEvent } from '../models/HabitEvent';
export declare class HabitService {
    static createHabit(userId: string, data: {
        name: string;
        description?: string;
        frequency?: HabitFrequency;
        goalPerPeriod: number;
        difficulty?: Difficulty;
        category?: Category;
        xpReward?: number;
        coinReward?: number;
        daysOfWeek?: number[];
    }): Promise<{
        id: string;
    }>;
    static getAllHabits(userId: string): Promise<Habit[]>;
    static getHabitById(userId: string, habitId: string): Promise<{
        id: string;
    }>;
    static updateHabit(userId: string, habitId: string, updates: Partial<Omit<Habit, 'id' | 'user'>>): Promise<Habit>;
    static archiveHabit(userId: string, habitId: string): Promise<{
        id: string;
    }>;
    static unarchiveHabit(userId: string, habitId: string): Promise<{
        id: string;
    }>;
    static deleteHabit(userId: string, habitId: string): Promise<{
        message: string;
    }>;
    static getHabitsByFrequency(userId: string, frequency: HabitFrequency): Promise<Habit[]>;
    static getHabitsByCategory(userId: string, category: Category): Promise<Habit[]>;
    static getArchivedHabits(userId: string): Promise<Habit[]>;
    static getHabitCount(userId: string): Promise<number>;
    static getArchivedHabitCount(userId: string): Promise<number>;
    static getHabitByName(userId: string, name: string): Promise<Habit | null>;
    static checkInHabit({ userId, habitId, sourceId, notes, apiKey, }: {
        userId: string;
        habitId: string;
        sourceId?: string;
        notes?: string;
        apiKey?: string;
    }): Promise<{
        message: string;
        event: HabitEvent;
    }>;
    static searchHabits(userId: string, query: string): Promise<Habit[]>;
}
