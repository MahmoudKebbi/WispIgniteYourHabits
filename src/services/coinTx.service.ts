import { AppDataSource } from '../repositories/db';
import { CoinTransaction } from '../models/CoinTransaction';
import { User } from '../models/User';
import { Between } from 'typeorm';
import { createError } from '../utils/errorHandler';

export class CoinTransactionService {
   static async getBalance(userId: string): Promise<number> {
      const repo = AppDataSource.getRepository(CoinTransaction);

      const { sum } = await repo
         .createQueryBuilder('coin')
         .select('SUM(coin.amount)', 'sum')
         .where('coin.user_id = :userId', { userId })
         .getRawOne();

      return Number(sum) || 0;
   }

   static async getHistory(userId: string, filters?: { from?: Date; to?: Date }) {
      const repo = AppDataSource.getRepository(CoinTransaction);

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

   static async addCoins(userId: string, amount: number, reason: string, referenceId?: string) {
      const repo = AppDataSource.getRepository(CoinTransaction);
      const userRepo = AppDataSource.getRepository(User);

      if (amount <= 0) {
         throw createError('Coin amount must be positive', 400);
      }

      const user = await userRepo.findOneBy({ id: userId });
      if (!user) throw createError('User not found', 404);

      const tx = repo.create({
         user,
         amount,
         reason,
         reference_id: referenceId,
      });

      return await repo.save(tx);
   }

   static async spendCoins(userId: string, amount: number, reason: string, referenceId?: string) {
      if (amount <= 0) {
         throw createError('Coin amount must be positive', 400);
      }

      const current = await this.getBalance(userId);
      if (current < amount) {
         throw createError('Not enough coins', 400);
      }

      return this.addCoins(userId, -amount, reason, referenceId);
   }
}
