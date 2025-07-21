"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notification_controller_1 = require("../controllers/notification.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authMiddleware); // Ensure all routes are protected
router.get('/', notification_controller_1.NotificationController.getNotifications);
router.post('/:id/read', notification_controller_1.NotificationController.markAsRead);
router.post('/read-all', notification_controller_1.NotificationController.markAllAsRead);
exports.default = router;
//# sourceMappingURL=notification.routes.js.map