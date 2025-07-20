import { User } from './User';
export declare class UserLevel {
    id: string;
    user: User;
    level: number;
    xp_total: number;
    xp_to_next: number;
    level_up_at?: Date;
    created_at: Date;
    updated_at: Date;
}
