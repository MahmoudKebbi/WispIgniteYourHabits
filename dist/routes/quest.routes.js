"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const quests_controller_1 = require("../controllers/quests.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authMiddleware);
router.post('/quests', quests_controller_1.QuestController.createQuest);
router.get('/quests/:id', quests_controller_1.QuestController.getQuestById);
router.get('/quests/:id', quests_controller_1.QuestController.getFriendQuests);
router.get('/quests/:id', quests_controller_1.QuestController.getMyQuests);
router.post('/quests/:questId/join', quests_controller_1.QuestController.joinQuest);
router.post('/quests/:questId/complete', quests_controller_1.QuestController.completeQuest);
router.get('/quests', quests_controller_1.QuestController.getQuestById);
router.delete('/quests/:id', quests_controller_1.QuestController.deleteQuest);
router.get('/quests/:id', quests_controller_1.QuestController.getQuestById);
router.post('/quests/:id', quests_controller_1.QuestController.leaveQuest);
exports.default = router;
//# sourceMappingURL=quest.routes.js.map