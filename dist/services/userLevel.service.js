"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLevelService = void 0;
const db_1 = require("../repositories/db");
const UserLevel_1 = require("../models/UserLevel");
const User_1 = require("../models/User");
const errorHandler_1 = require("../utils/errorHandler");
function calculateXpToNextLevel(level) {
    return 100 + Math.floor(50 * Math.pow(level, 1.2));
}
class UserLevelService {
    static async getOrCreateUserLevel(userId) {
        const repo = db_1.AppDataSource.getRepository(UserLevel_1.UserLevel);
        let userLevel = await repo.findOne({ where: { user: { id: userId } } });
        if (!userLevel) {
            const userRepo = db_1.AppDataSource.getRepository(User_1.User);
            const user = await userRepo.findOne({ where: { id: userId } });
            if (!user)
                throw (0, errorHandler_1.createError)('User not found', 404);
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
    static async addXp(userId, xpAmount) {
        const repo = db_1.AppDataSource.getRepository(UserLevel_1.UserLevel);
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
    static async getUserLevel(userId) {
        const repo = db_1.AppDataSource.getRepository(UserLevel_1.UserLevel);
        const userLevel = await repo.findOne({
            where: { user: { id: userId } },
        });
        if (!userLevel)
            throw (0, errorHandler_1.createError)('User level not found', 404);
        return userLevel;
    }
    static async getXpProgress(userId) {
        const repo = db_1.AppDataSource.getRepository(UserLevel_1.UserLevel);
        const userLevel = await repo.findOne({ where: { user: { id: userId } } });
        if (!userLevel)
            throw (0, errorHandler_1.createError)('User level not found', 404);
        return {
            xpToNext: userLevel.xp_to_next,
            xpRemaining: userLevel.xp_to_next - userLevel.xp_total,
        };
    }
}
exports.UserLevelService = UserLevelService;
//# sourceMappingURL=userLevel.service.js.map