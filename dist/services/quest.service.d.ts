import { Quest } from '../models/Quest';
export declare class QuestService {
    static createQuest(userId: string, data: {
        title: string;
        description?: string;
        xp_reward?: number;
        coin_reward?: number;
        start_date?: Date;
        end_date?: Date;
        is_friend_quest?: boolean;
    }): Promise<Quest>;
    static getUserQuests(userId: string): Promise<Quest[]>;
    static getQuestById(questId: string): Promise<Quest>;
    static joinQuest(userId: string, questId: string): Promise<Quest>;
    static completeQuest(userId: string, questId: string): Promise<{
        message: string;
        quest: Quest;
    }>;
    static deleteQuest(questId: string): Promise<Quest>;
    static getFriendQuests(userId: string): Promise<Quest[]>;
    static leaveQuest(userId: string, questId: string): Promise<Quest>;
    static updateQuest(questId: string, updates: Partial<Quest>): Promise<Quest>;
}
