"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestController = void 0;
const quest_service_1 = require("../services/quest.service");
class QuestController {
    static async createQuest(req, res) {
        try {
            const user = req.user;
            if (!user?.userId)
                return res.status(401).json({ error: 'User not authenticated' });
            const quest = await quest_service_1.QuestService.createQuest(user.userId, req.body);
            return res.status(201).json(quest);
        }
        catch (err) {
            console.error('Create quest error:', err);
            return res.status(err.statusCode || 500).json({ error: err.message });
        }
    }
    static async deleteQuest(req, res) {
        try {
            const { questId } = req.params;
            const result = await quest_service_1.QuestService.deleteQuest(questId);
            return res.status(200).json({ message: 'Quest deleted successfully', result });
        }
        catch (err) {
            console.error('Delete quest error:', err);
            return res.status(err.statusCode || 500).json({ error: err.message });
        }
    }
    static async getMyQuests(req, res) {
        try {
            const user = req.user;
            if (!user?.userId)
                return res.status(401).json({ error: 'User not authenticated' });
            const quests = await quest_service_1.QuestService.getUserQuests(user.userId);
            return res.json(quests);
        }
        catch (err) {
            console.error('Get my quests error:', err);
            return res.status(err.statusCode || 500).json({ error: err.message });
        }
    }
    static async getQuestById(req, res) {
        try {
            const { questId } = req.params;
            const quest = await quest_service_1.QuestService.getQuestById(questId);
            return res.json(quest);
        }
        catch (err) {
            console.error('Get quest error:', err);
            return res.status(err.statusCode || 500).json({ error: err.message });
        }
    }
    static async joinQuest(req, res) {
        try {
            const user = req.user;
            const { questId } = req.params;
            if (!user?.userId)
                return res.status(401).json({ error: 'User not authenticated' });
            const quest = await quest_service_1.QuestService.joinQuest(user.userId, questId);
            return res.json(quest);
        }
        catch (err) {
            console.error('Join quest error:', err);
            return res.status(err.statusCode || 500).json({ error: err.message });
        }
    }
    static async leaveQuest(req, res) {
        try {
            const user = req.user;
            const { questId } = req.params;
            if (!user?.userId)
                return res.status(401).json({ error: 'User not authenticated' });
            const result = await quest_service_1.QuestService.leaveQuest(user.userId, questId);
            return res.json(result);
        }
        catch (err) {
            console.error('Leave quest error:', err);
            return res.status(err.statusCode || 500).json({ error: err.message });
        }
    }
    static async completeQuest(req, res) {
        try {
            const user = req.user;
            const { questId } = req.params;
            if (!user?.userId)
                return res.status(401).json({ error: 'User not authenticated' });
            const result = await quest_service_1.QuestService.completeQuest(user.userId, questId);
            return res.json(result);
        }
        catch (err) {
            console.error('Complete quest error:', err);
            return res.status(err.statusCode || 500).json({ error: err.message });
        }
    }
    static async getFriendQuests(req, res) {
        try {
            const user = req.user;
            if (!user?.userId)
                return res.status(401).json({ error: 'User not authenticated' });
            const quests = await quest_service_1.QuestService.getFriendQuests(user.userId);
            return res.json(quests);
        }
        catch (err) {
            console.error('Get friend quests error:', err);
            return res.status(err.statusCode || 500).json({ error: err.message });
        }
    }
}
exports.QuestController = QuestController;
//# sourceMappingURL=quests.controller.js.map