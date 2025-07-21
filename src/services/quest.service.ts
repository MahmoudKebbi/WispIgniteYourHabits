import { AppDataSource } from '../repositories/db';
import { Quest } from '../models/Quest';
import { User } from '../models/User';
import { createError } from '../utils/errorHandler';
import { CoinTransaction } from '../models/CoinTransaction';
import { XpTransaction } from '../models/XPTransaction';

export class QuestService {
   static async createQuest(
      userId: string,
      data: {
         title: string;
         description?: string;
         xp_reward?: number;
         coin_reward?: number;
         start_date?: Date;
         end_date?: Date;
         is_friend_quest?: boolean;
      }
   ) {
      const questRepo = AppDataSource.getRepository(Quest);
      const userRepo = AppDataSource.getRepository(User);
      const creator = await userRepo.findOneBy({ id: userId });
      if (!creator) throw createError('User not found', 404);

      const quest = questRepo.create({
         ...data,
         creator,
         status: 'open',
      });
      return await questRepo.save(quest);
   }

   static async getUserQuests(userId: string) {
      const questRepo = AppDataSource.getRepository(Quest);
      return questRepo.find({
         where: [{ creator: { id: userId } }, { participants: { id: userId } }],
         relations: ['participants', 'creator'],
         order: { created_at: 'DESC' },
      });
   }

   static async getQuestById(questId: string) {
      const questRepo = AppDataSource.getRepository(Quest);
      const quest = await questRepo.findOne({
         where: { id: questId },
         relations: ['participants', 'creator'],
      });
      if (!quest) throw createError('Quest not found', 404);
      return quest;
   }

   static async joinQuest(userId: string, questId: string) {
      const questRepo = AppDataSource.getRepository(Quest);
      const userRepo = AppDataSource.getRepository(User);

      const quest = await questRepo.findOne({
         where: { id: questId },
         relations: ['participants'],
      });
      if (!quest) throw createError('Quest not found', 404);

      const user = await userRepo.findOneBy({ id: userId });
      if (!user) throw createError('User not found', 404);

      if (quest.participants.some((p) => p.id === userId)) {
         throw createError('Already joined', 400);
      }

      quest.participants.push(user);
      return await questRepo.save(quest);
   }

   static async completeQuest(userId: string, questId: string) {
      const questRepo = AppDataSource.getRepository(Quest);
      const coinRepo = AppDataSource.getRepository(CoinTransaction);
      const xpRepo = AppDataSource.getRepository(XpTransaction);

      const quest = await questRepo.findOne({
         where: { id: questId },
         relations: ['participants', 'creator'],
      });
      if (!quest) throw createError('Quest not found', 404);
      if (!quest.participants.some((p) => p.id === userId)) {
         throw createError('You are not a participant of this quest', 403);
      }

      if (quest.status !== 'in_progress' && quest.status !== 'open') {
         throw createError('Quest cannot be completed', 400);
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

   static async deleteQuest(questId: string) {
      const questRepo = AppDataSource.getRepository(Quest);
      const quest = await questRepo.findOne({ where: { id: questId } });
      if (!quest) throw createError('Quest not found', 404);
      return await questRepo.remove(quest);
   }

   static async getFriendQuests(userId: string) {
      const questRepo = AppDataSource.getRepository(Quest);
      return questRepo.find({
         where: {
            is_friend_quest: true,
            participants: { id: userId },
         },
         relations: ['participants', 'creator'],
         order: { created_at: 'DESC' },
      });
   }

   static async leaveQuest(userId: string, questId: string) {
      const questRepo = AppDataSource.getRepository(Quest);
      const quest = await questRepo.findOne({
         where: { id: questId },
         relations: ['participants'],
      });
      if (!quest) throw createError('Quest not found', 404);

      if (!quest.participants.some((p) => p.id === userId)) {
         throw createError('You are not a participant of this quest', 403);
      }

      quest.participants = quest.participants.filter((p) => p.id !== userId);
      return await questRepo.save(quest);
   }
   static async updateQuest(questId: string, updates: Partial<Quest>) {
      const questRepo = AppDataSource.getRepository(Quest);
      const quest = await questRepo.findOne({
         where: { id: questId },
         relations: ['participants', 'creator'],
      });
      if (!quest) throw createError('Quest not found', 404);

      Object.assign(quest, updates);
      return await questRepo.save(quest);
   }
}
