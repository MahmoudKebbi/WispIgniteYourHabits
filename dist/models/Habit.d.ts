import { User } from './User';
export type HabitFrequency = 'daily' | 'weekly' | 'custom';
export type Difficulty = 'very_easy' | 'easy' | 'medium' | 'hard' | 'epic';
export type Category = 'health' | 'productivity' | 'self_care' | 'chores' | 'creativity';
export declare class Habit {
    id: string;
    user: User;
    name: string;
    description?: string;
    frequency: HabitFrequency;
    goal_per_period: number;
    difficulty?: Difficulty;
    category?: Category;
    xp_reward?: number;
    coin_reward?: number;
    is_archived: boolean;
    days_of_week?: number[];
    created_at: Date;
    updated_at: Date;
}
