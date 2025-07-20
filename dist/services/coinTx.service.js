"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinTransactionService = void 0;
const db_1 = require("../repositories/db");
const CoinTransaction_1 = require("../models/CoinTransaction");
const User_1 = require("../models/User");
const typeorm_1 = require("typeorm");
const errorHandler_1 = require("../utils/errorHandler");
class CoinTransactionService {
    static async getBalance(userId) {
        const repo = db_1.AppDataSource.getRepository(CoinTransaction_1.CoinTransaction);
        const { sum } = await repo
            .createQueryBuilder('coin')
            .select('SUM(coin.amount)', 'sum')
            .where('coin.user_id = :userId', { userId })
            .getRawOne();
        return Number(sum) || 0;
    }
    static async getHistory(userId, filters) {
        const repo = db_1.AppDataSource.getRepository(CoinTransaction_1.CoinTransaction);
        const where = { user: { id: userId } };
        if (filters?.from && filters?.to) {
            where.created_at = (0, typeorm_1.Between)(filters.from, filters.to);
        }
        else if (filters?.from) {
            where.created_at = (0, typeorm_1.Between)(filters.from, new Date());
        }
        else if (filters?.to) {
            where.created_at = (0, typeorm_1.Between)(new Date(0), filters.to);
        }
        return repo.find({
            where,
            order: { created_at: 'DESC' },
        });
    }
    static async addCoins(userId, amount, reason, referenceId) {
        const repo = db_1.AppDataSource.getRepository(CoinTransaction_1.CoinTransaction);
        const userRepo = db_1.AppDataSource.getRepository(User_1.User);
        if (amount <= 0) {
            throw (0, errorHandler_1.createError)('Coin amount must be positive', 400);
        }
        const user = await userRepo.findOneBy({ id: userId });
        if (!user)
            throw (0, errorHandler_1.createError)('User not found', 404);
        const tx = repo.create({
            user,
            amount,
            reason,
            reference_id: referenceId,
        });
        return await repo.save(tx);
    }
    static async spendCoins(userId, amount, reason, referenceId) {
        if (amount <= 0) {
            throw (0, errorHandler_1.createError)('Coin amount must be positive', 400);
        }
        const current = await this.getBalance(userId);
        if (current < amount) {
            throw (0, errorHandler_1.createError)('Not enough coins', 400);
        }
        return this.addCoins(userId, -amount, reason, referenceId);
    }
}
exports.CoinTransactionService = CoinTransactionService;
//# sourceMappingURL=coinTx.service.js.map