import { Request, Response } from 'express';
import { QuestService } from '../services/quest.service';

export class QuestController {
   static async createQuest(req: Request, res: Response) {
      try {
         const user = req.user as { userId: string };
         if (!user?.userId) return res.status(401).json({ error: 'User not authenticated' });

         const quest = await QuestService.createQuest(user.userId, req.body);
         return res.status(201).json(quest);
      } catch (err: any) {
         console.error('Create quest error:', err);
         return res.status(err.statusCode || 500).json({ error: err.message });
      }
   }

   static async deleteQuest(req: Request, res: Response) {
      try {
         const { questId } = req.params;
         const result = await QuestService.deleteQuest(questId);
         return res.status(200).json({ message: 'Quest deleted successfully', result });
      } catch (err: any) {
         console.error('Delete quest error:', err);
         return res.status(err.statusCode || 500).json({ error: err.message });
      }
   }

   static async getMyQuests(req: Request, res: Response) {
      try {
         const user = req.user as { userId: string };
         if (!user?.userId) return res.status(401).json({ error: 'User not authenticated' });

         const quests = await QuestService.getUserQuests(user.userId);
         return res.json(quests);
      } catch (err: any) {
         console.error('Get my quests error:', err);
         return res.status(err.statusCode || 500).json({ error: err.message });
      }
   }

   static async getQuestById(req: Request, res: Response) {
      try {
         const { questId } = req.params;
         const quest = await QuestService.getQuestById(questId);
         return res.json(quest);
      } catch (err: any) {
         console.error('Get quest error:', err);
         return res.status(err.statusCode || 500).json({ error: err.message });
      }
   }

   static async joinQuest(req: Request, res: Response) {
      try {
         const user = req.user as { userId: string };
         const { questId } = req.params;
         if (!user?.userId) return res.status(401).json({ error: 'User not authenticated' });

         const quest = await QuestService.joinQuest(user.userId, questId);
         return res.json(quest);
      } catch (err: any) {
         console.error('Join quest error:', err);
         return res.status(err.statusCode || 500).json({ error: err.message });
      }
   }

   static async leaveQuest(req: Request, res: Response) {
      try {
         const user = req.user as { userId: string };
         const { questId } = req.params;
         if (!user?.userId) return res.status(401).json({ error: 'User not authenticated' });

         const result = await QuestService.leaveQuest(user.userId, questId);
         return res.json(result);
      } catch (err: any) {
         console.error('Leave quest error:', err);
         return res.status(err.statusCode || 500).json({ error: err.message });
      }
   }

   static async completeQuest(req: Request, res: Response) {
      try {
         const user = req.user as { userId: string };
         const { questId } = req.params;
         if (!user?.userId) return res.status(401).json({ error: 'User not authenticated' });

         const result = await QuestService.completeQuest(user.userId, questId);
         return res.json(result);
      } catch (err: any) {
         console.error('Complete quest error:', err);
         return res.status(err.statusCode || 500).json({ error: err.message });
      }
   }

   static async getFriendQuests(req: Request, res: Response) {
      try {
         const user = req.user as { userId: string };
         if (!user?.userId) return res.status(401).json({ error: 'User not authenticated' });

         const quests = await QuestService.getFriendQuests(user.userId);
         return res.json(quests);
      } catch (err: any) {
         console.error('Get friend quests error:', err);
         return res.status(err.statusCode || 500).json({ error: err.message });
      }
   }
}
