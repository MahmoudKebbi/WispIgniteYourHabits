import { AppDataSource } from '../repositories/db';
import { UserLevel } from '../models/UserLevel';
import { User } from '../models/User';
import { createError } from '../utils/errorHandler';

function calculateXpToNextLevel(level: number): number {
   return 100 + Math.floor(50 * Math.pow(level, 1.2));
}

export class UserLevelService {
   static async getOrCreateUserLevel(userId: string): Promise<UserLevel> {
      const repo = AppDataSource.getRepository(UserLevel);
      let userLevel = await repo.findOne({ where: { user: { id: userId } } });

      if (!userLevel) {
         const userRepo = AppDataSource.getRepository(User);
         const user = await userRepo.findOne({ where: { id: userId } });
         if (!user) throw createError('User not found', 404);

         userLevel = repo.create({
            user,
            level: 1,
            xp_total: 0,
            xp_to_next: calculateXpToNextLevel(1),
         });
         await repo.save(userLevel);
      }

      return userLevel;
   }

   static async addXp(userId: string, xpAmount: number): Promise<UserLevel> {
      const repo = AppDataSource.getRepository(UserLevel);
      const userLevel = await this.getOrCreateUserLevel(userId);

      userLevel.xp_total += xpAmount;

      while (userLevel.xp_total >= userLevel.xp_to_next) {
         userLevel.xp_total -= userLevel.xp_to_next;
         userLevel.level += 1;
         userLevel.xp_to_next = calculateXpToNextLevel(userLevel.level);
         userLevel.level_up_at = new Date();
      }

      return repo.save(userLevel);
   }

   static async getUserLevel(userId: string) {
      const repo = AppDataSource.getRepository(UserLevel);
      const userLevel = await repo.findOne({
         where: { user: { id: userId } },
      });
      if (!userLevel) throw createError('User level not found', 404);
      return userLevel;
   }

   static async getXpProgress(userId: string): Promise<{ xpToNext: number; xpRemaining: number }> {
      const repo = AppDataSource.getRepository(UserLevel);
      const userLevel = await repo.findOne({ where: { user: { id: userId } } });

      if (!userLevel) throw createError('User level not found', 404);

      return {
         xpToNext: userLevel.xp_to_next,
         xpRemaining: userLevel.xp_to_next - userLevel.xp_total,
      };
   }
}
