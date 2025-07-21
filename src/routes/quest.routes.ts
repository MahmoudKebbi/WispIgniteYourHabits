import { Router } from 'express';
import { QuestController } from '../controllers/quests.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.post('/quests', QuestController.createQuest);
router.get('/quests/:id', QuestController.getQuestById);
router.get('/quests/:id', QuestController.getFriendQuests);
router.get('/quests/:id', QuestController.getMyQuests);
router.post('/quests/:questId/join', QuestController.joinQuest);
router.post('/quests/:questId/complete', QuestController.completeQuest);
router.get('/quests', QuestController.getQuestById);
router.delete('/quests/:id', QuestController.deleteQuest);
router.get('/quests/:id', QuestController.getQuestById);
router.post('/quests/:id', QuestController.leaveQuest);

export default router;
