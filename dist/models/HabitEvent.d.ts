import { User } from './User';
import { Habit } from './Habit';
import { Source } from './Source';
export declare class HabitEvent {
    id: string;
    user: User;
    habit: Habit;
    source?: Source;
    completed_at: Date;
    xp_earned: number;
    coin_earned: number;
    notes?: string;
}
