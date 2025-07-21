import { UserLevel } from '../models/UserLevel';
export declare class UserLevelService {
    static getOrCreateUserLevel(userId: string): Promise<UserLevel>;
    static addXp(userId: string, xpAmount: number): Promise<UserLevel>;
    static getUserLevel(userId: string): Promise<UserLevel>;
    static getXpProgress(userId: string): Promise<{
        xpToNext: number;
        xpRemaining: number;
    }>;
}
