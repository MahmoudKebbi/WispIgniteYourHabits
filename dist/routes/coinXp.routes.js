"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const coinAndXp_controller_1 = require("../controllers/coinAndXp.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authMiddleware);
router.get('/xp/balance', coinAndXp_controller_1.XpAndCoinController.getXpBalance);
router.get('/coin/balance', coinAndXp_controller_1.XpAndCoinController.getCoinBalance);
router.get('/xp/history', coinAndXp_controller_1.XpAndCoinController.getXpHistory);
router.get('/coin/history', coinAndXp_controller_1.XpAndCoinController.getCoinHistory);
router.get('/stats', coinAndXp_controller_1.XpAndCoinController.getGamificationStats);
exports.default = router;
//# sourceMappingURL=coinXp.routes.js.map