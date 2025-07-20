"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XpAndCoinController = void 0;
const xpTx_service_1 = require("../services/xpTx.service");
const coinTx_service_1 = require("../services/coinTx.service");
class XpAndCoinController {
    static async getXpBalance(req, res) {
        try {
            const userId = req.user.id;
            const balance = await xpTx_service_1.XpTransactionService.getBalance(userId);
            res.json({ xp: balance });
        }
        catch (err) {
            res.status(400).json({ error: err.message || 'Could not fetch XP balance' });
        }
    }
    static async getCoinBalance(req, res) {
        try {
            const userId = req.user.id;
            const balance = await coinTx_service_1.CoinTransactionService.getBalance(userId);
            res.json({ coins: balance });
        }
        catch (err) {
            res.status(400).json({ error: err.message || 'Could not fetch coin balance' });
        }
    }
    static async getXpHistory(req, res) {
        try {
            const userId = req.user.id;
            const { from, to } = req.query;
            const history = await xpTx_service_1.XpTransactionService.getHistory(userId, {
                from: from ? new Date(from) : undefined,
                to: to ? new Date(to) : undefined,
            });
            res.json({ history });
        }
        catch (err) {
            res.status(400).json({ error: err.message || 'Could not fetch XP history' });
        }
    }
    static async getCoinHistory(req, res) {
        try {
            const userId = req.user.id;
            const { from, to } = req.query;
            const history = await coinTx_service_1.CoinTransactionService.getHistory(userId, {
                from: from ? new Date(from) : undefined,
                to: to ? new Date(to) : undefined,
            });
            res.json({ history });
        }
        catch (err) {
            res.status(400).json({ error: err.message || 'Could not fetch coin history' });
        }
    }
    static async getGamificationStats(req, res) {
        try {
            const userId = req.user.id;
            const [xp, coins] = await Promise.all([
                xpTx_service_1.XpTransactionService.getBalance(userId),
                coinTx_service_1.CoinTransactionService.getBalance(userId),
            ]);
            res.json({ xp, coins });
        }
        catch (err) {
            res.status(400).json({ error: err.message || 'Could not fetch gamification stats' });
        }
    }
}
exports.XpAndCoinController = XpAndCoinController;
//# sourceMappingURL=coinAndXp.controller.js.map