import { Request, Response } from 'express';
import { UserLevelService } from '../services/userLevel.service';

export class UserLevelController {
   static async getLevel(req: Request, res: Response) {
      try {
         const user = req.user as { userId: string };
         if (!user?.userId) {
            return res.status(401).json({ error: 'User not authenticated' });
         }
         const userId = user.userId;
         const level = await UserLevelService.getOrCreateUserLevel(userId);
         return res.json(level);
      } catch (err: any) {
         console.error('Get level error:', err);
         const statusCode = err.statusCode || 500;
         return res.status(statusCode).json({ error: err.message || 'Could not fetch user level' });
      }
   }

   static async getXpProgress(req: Request, res: Response) {
      try {
         const user = req.user as { userId: string };
         if (!user?.userId) {
            return res.status(401).json({ error: 'User not authenticated' });
         }
         const userId = user.userId;
         const progress = await UserLevelService.getXpProgress(userId);
         return res.json(progress);
      } catch (err: any) {
         console.error('Get XP progress error:', err);
         const statusCode = err.statusCode || 500;
         return res
            .status(statusCode)
            .json({ error: err.message || 'Could not fetch XP progress' });
      }
   }
}
