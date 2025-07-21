"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestService = void 0;
const db_1 = require("../repositories/db");
const Quest_1 = require("../models/Quest");
const User_1 = require("../models/User");
const errorHandler_1 = require("../utils/errorHandler");
const CoinTransaction_1 = require("../models/CoinTransaction");
const XPTransaction_1 = require("../models/XPTransaction");
class QuestService {
    static async createQuest(userId, data) {
        const questRepo = db_1.AppDataSource.getRepository(Quest_1.Quest);
        const userRepo = db_1.AppDataSource.getRepository(User_1.User);
        const creator = await userRepo.findOneBy({ id: userId });
        if (!creator)
            throw (0, errorHandler_1.createError)('User not found', 404);
        const quest = questRepo.create({
            ...data,
            creator,
            status: 'open',
        });
        return await questRepo.save(quest);
    }
    static async getUserQuests(userId) {
        const questRepo = db_1.AppDataSource.getRepository(Quest_1.Quest);
        return questRepo.find({
            where: [{ creator: { id: userId } }, { participants: { id: userId } }],
            relations: ['participants', 'creator'],
            order: { created_at: 'DESC' },
        });
    }
    static async getQuestById(questId) {
        const questRepo = db_1.AppDataSource.getRepository(Quest_1.Quest);
        const quest = await questRepo.findOne({
            where: { id: questId },
            relations: ['participants', 'creator'],
        });
        if (!quest)
            throw (0, errorHandler_1.createError)('Quest not found', 404);
        return quest;
    }
    static async joinQuest(userId, questId) {
        const questRepo = db_1.AppDataSource.getRepository(Quest_1.Quest);
        const userRepo = db_1.AppDataSource.getRepository(User_1.User);
        const quest = await questRepo.findOne({
            where: { id: questId },
            relations: ['participants'],
        });
        if (!quest)
            throw (0, errorHandler_1.createError)('Quest not found', 404);
        const user = await userRepo.findOneBy({ id: userId });
        if (!user)
            throw (0, errorHandler_1.createError)('User not found', 404);
        if (quest.participants.some((p) => p.id === userId)) {
            throw (0, errorHandler_1.createError)('Already joined', 400);
        }
        quest.participants.push(user);
        return await questRepo.save(quest);
    }
    static async completeQuest(userId, questId) {
        const questRepo = db_1.AppDataSource.getRepository(Quest_1.Quest);
        const coinRepo = db_1.AppDataSource.getRepository(CoinTransaction_1.CoinTransaction);
        const xpRepo = db_1.AppDataSource.getRepository(XPTransaction_1.XpTransaction);
        const quest = await questRepo.findOne({
            where: { id: questId },
            relations: ['participants', 'creator'],
        });
        if (!quest)
            throw (0, errorHandler_1.createError)('Quest not found', 404);
        if (!quest.participants.some((p) => p.id === userId)) {
            throw (0, errorHandler_1.createError)('You are not a participant of this quest', 403);
        }
        if (quest.status !== 'in_progress' && quest.status !== 'open') {
            throw (0, errorHandler_1.createError)('Quest cannot be completed', 400);
        }
        quest.status = 'completed';
        await questRepo.save(quest);
        const coinTx = coinRepo.create({
            user: { id: userId },
            amount: quest.coin_reward,
            reason: `Completed quest: ${quest.title}`,
        });
        const xpTx = xpRepo.create({
            user: { id: userId },
            amount: quest.xp_reward,
            reason: `Completed quest: ${quest.title}`,
        });
        await coinRepo.save(coinTx);
        await xpRepo.save(xpTx);
        return { message: 'Quest completed', quest };
    }
    static async deleteQuest(questId) {
        const questRepo = db_1.AppDataSource.getRepository(Quest_1.Quest);
        const quest = await questRepo.findOne({ where: { id: questId } });
        if (!quest)
            throw (0, errorHandler_1.createError)('Quest not found', 404);
        return await questRepo.remove(quest);
    }
    static async getFriendQuests(userId) {
        const questRepo = db_1.AppDataSource.getRepository(Quest_1.Quest);
        return questRepo.find({
            where: {
                is_friend_quest: true,
                participants: { id: userId },
            },
            relations: ['participants', 'creator'],
            order: { created_at: 'DESC' },
        });
    }
    static async leaveQuest(userId, questId) {
        const questRepo = db_1.AppDataSource.getRepository(Quest_1.Quest);
        const quest = await questRepo.findOne({
            where: { id: questId },
            relations: ['participants'],
        });
        if (!quest)
            throw (0, errorHandler_1.createError)('Quest not found', 404);
        if (!quest.participants.some((p) => p.id === userId)) {
            throw (0, errorHandler_1.createError)('You are not a participant of this quest', 403);
        }
        quest.participants = quest.participants.filter((p) => p.id !== userId);
        return await questRepo.save(quest);
    }
    static async updateQuest(questId, updates) {
        const questRepo = db_1.AppDataSource.getRepository(Quest_1.Quest);
        const quest = await questRepo.findOne({
            where: { id: questId },
            relations: ['participants', 'creator'],
        });
        if (!quest)
            throw (0, errorHandler_1.createError)('Quest not found', 404);
        Object.assign(quest, updates);
        return await questRepo.save(quest);
    }
}
exports.QuestService = QuestService;
//# sourceMappingURL=quest.service.js.map