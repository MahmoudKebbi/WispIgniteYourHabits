import { User } from './User';
export type QuestStatus = 'open' | 'in_progress' | 'completed' | 'failed';
export declare class Quest {
    id: string;
    creator: User;
    title: string;
    description?: string;
    xp_reward: number;
    coin_reward: number;
    start_date?: Date;
    end_date?: Date;
    status: QuestStatus;
    is_friend_quest: boolean;
    participants: User[];
    created_at: Date;
    updated_at: Date;
}
