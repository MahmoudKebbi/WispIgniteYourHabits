"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLevelController = void 0;
const userLevel_service_1 = require("../services/userLevel.service");
class UserLevelController {
    static async getLevel(req, res) {
        try {
            const user = req.user;
            if (!user?.userId) {
                return res.status(401).json({ error: 'User not authenticated' });
            }
            const userId = user.userId;
            const level = await userLevel_service_1.UserLevelService.getOrCreateUserLevel(userId);
            return res.json(level);
        }
        catch (err) {
            console.error('Get level error:', err);
            const statusCode = err.statusCode || 500;
            return res.status(statusCode).json({ error: err.message || 'Could not fetch user level' });
        }
    }
    static async getXpProgress(req, res) {
        try {
            const user = req.user;
            if (!user?.userId) {
                return res.status(401).json({ error: 'User not authenticated' });
            }
            const userId = user.userId;
            const progress = await userLevel_service_1.UserLevelService.getXpProgress(userId);
            return res.json(progress);
        }
        catch (err) {
            console.error('Get XP progress error:', err);
            const statusCode = err.statusCode || 500;
            return res
                .status(statusCode)
                .json({ error: err.message || 'Could not fetch XP progress' });
        }
    }
}
exports.UserLevelController = UserLevelController;
//# sourceMappingURL=userLevels.controller.js.map