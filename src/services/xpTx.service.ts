import { AppDataSource } from '../repositories/db';
import { XpTransaction } from '../models/XPTransaction';
import { User } from '../models/User';
import { Between } from 'typeorm';
import { createError } from '../utils/errorHandler';
import { UserLevelService } from './userLevel.service';

export class XpTransactionService {
   static async getBalance(userId: string) {
      const repo = AppDataSource.getRepository(XpTransaction);

      const { sum } = await repo
         .createQueryBuilder('xp')
         .select('SUM(xp.amount)', 'sum')
         .where('xp.user_id = :userId', { userId })
         .getRawOne();

      return Number(sum) || 0;
   }

   static async getHistory(userId: string, filters?: { from?: Date; to?: Date }) {
      const repo = AppDataSource.getRepository(XpTransaction);

      const where: any = { user: { id: userId } };

      if (filters?.from && filters?.to) {
         where.created_at = Between(filters.from, filters.to);
      } else if (filters?.from) {
         where.created_at = Between(filters.from, new Date());
      } else if (filters?.to) {
         where.created_at = Between(new Date(0), filters.to);
      }

      return repo.find({
         where,
         order: { created_at: 'DESC' },
      });
   }

   static async addXP(userId: string, amount: number, reason: string, referenceId?: string) {
      const repo = AppDataSource.getRepository(XpTransaction);
      const userRepo = AppDataSource.getRepository(User);

      if (amount <= 0) {
         throw createError('XP amount must be positive', 400);
      }

      const user = await userRepo.findOneBy({ id: userId });
      if (!user) throw createError('User not found', 404);

      const xp = repo.create({
         user,
         amount,
         reason,
         reference_id: referenceId,
      });
      await UserLevelService.addXp(userId, amount);

      return await repo.save(xp);
   }

   static async spendXP(userId: string, amount: number, reason: string, referenceId?: string) {
      if (amount <= 0) {
         throw createError('XP amount must be positive', 400);
      }

      const current = await this.getBalance(userId);
      if (current < amount) {
         throw createError('Not enough XP', 400);
      }

      return this.addXP(userId, -amount, reason, referenceId);
   }
}
