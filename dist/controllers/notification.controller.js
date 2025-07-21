"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationController = void 0;
const notification_service_1 = require("../services/notification.service");
class NotificationController {
    static async getNotifications(req, res) {
        try {
            const user = req.user;
            if (!user?.userId) {
                return res.status(401).json({ error: 'User not authenticated' });
            }
            const notifications = await notification_service_1.NotificationService.getNotifications(user.userId);
            return res.json(notifications);
        }
        catch (err) {
            console.error('Get notifications error:', err);
            const statusCode = err.statusCode || 500;
            return res
                .status(statusCode)
                .json({ error: err.message || 'Could not fetch notifications' });
        }
    }
    static async markAsRead(req, res) {
        try {
            const user = req.user;
            if (!user?.userId) {
                return res.status(401).json({ error: 'User not authenticated' });
            }
            const notificationId = req.params.id;
            if (!notificationId) {
                return res.status(400).json({ error: 'Notification ID is required' });
            }
            const updated = await notification_service_1.NotificationService.markAsRead(user.userId, notificationId);
            return res.json(updated);
        }
        catch (err) {
            console.error('Mark notification as read error:', err);
            const statusCode = err.statusCode || 500;
            return res
                .status(statusCode)
                .json({ error: err.message || 'Could not mark notification as read' });
        }
    }
    static async markAllAsRead(req, res) {
        try {
            const user = req.user;
            if (!user?.userId) {
                return res.status(401).json({ error: 'User not authenticated' });
            }
            const updated = await notification_service_1.NotificationService.markAllAsRead(user.userId);
            return res.json(updated);
        }
        catch (err) {
            console.error('Mark all notifications as read error:', err);
            const statusCode = err.statusCode || 500;
            return res
                .status(statusCode)
                .json({ error: err.message || 'Could not mark notifications as read' });
        }
    }
}
exports.NotificationController = NotificationController;
//# sourceMappingURL=notification.controller.js.map