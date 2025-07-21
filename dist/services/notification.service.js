"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const db_1 = require("../repositories/db");
const Notification_1 = require("../models/Notification");
const User_1 = require("../models/User");
const errorHandler_1 = require("../utils/errorHandler");
class NotificationService {
    static async sendNotification(userId, type, message, referenceId) {
        const userRepo = db_1.AppDataSource.getRepository(User_1.User);
        const notificationRepo = db_1.AppDataSource.getRepository(Notification_1.Notification);
        const user = await userRepo.findOneBy({ id: userId });
        if (!user)
            throw (0, errorHandler_1.createError)('User not found', 404);
        const notification = notificationRepo.create({
            user,
            type,
            message,
            reference_id: referenceId,
        });
        await notificationRepo.save(notification);
        return notification;
    }
    static async getNotifications(userId) {
        const notificationRepo = db_1.AppDataSource.getRepository(Notification_1.Notification);
        return notificationRepo.find({
            where: { user: { id: userId } },
            order: { created_at: 'DESC' },
        });
    }
    static async markAsRead(userId, notificationId) {
        const notificationRepo = db_1.AppDataSource.getRepository(Notification_1.Notification);
        const notification = await notificationRepo.findOne({
            where: { id: notificationId, user: { id: userId } },
        });
        if (!notification)
            throw (0, errorHandler_1.createError)('Notification not found', 404);
        notification.is_read = true;
        await notificationRepo.save(notification);
        return notification;
    }
    static async markAllAsRead(userId) {
        const notificationRepo = db_1.AppDataSource.getRepository(Notification_1.Notification);
        await notificationRepo.update({ user: { id: userId }, is_read: false }, { is_read: true });
        return { message: 'All notifications marked as read' };
    }
}
exports.NotificationService = NotificationService;
//# sourceMappingURL=notification.service.js.map