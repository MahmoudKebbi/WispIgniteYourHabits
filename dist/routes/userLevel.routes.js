"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userLevels_controller_1 = require("../controllers/userLevels.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authMiddleware);
router.get('/level', userLevels_controller_1.UserLevelController.getLevel);
router.get('/xp-progress', userLevels_controller_1.UserLevelController.getXpProgress);
exports.default = router;
//# sourceMappingURL=userLevel.routes.js.map