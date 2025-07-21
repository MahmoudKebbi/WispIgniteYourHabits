import { Notification, NotificationType } from '../models/Notification';
export declare class NotificationService {
    static sendNotification(userId: string, type: NotificationType, message: string, referenceId?: string): Promise<Notification>;
    static getNotifications(userId: string): Promise<Notification[]>;
    static markAsRead(userId: string, notificationId: string): Promise<Notification>;
    static markAllAsRead(userId: string): Promise<{
        message: string;
    }>;
}
