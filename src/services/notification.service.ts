import { AppDataSource } from '../repositories/db';
import { Notification, NotificationType } from '../models/Notification';
import { User } from '../models/User';
import { createError } from '../utils/errorHandler';
import { ReferenceType } from '../types/referenceTypes';

export class NotificationService {
   static async sendNotification(
      userId: string,
      type: NotificationType,
      message: string,
      referenceId?: string,
      referenceType?: ReferenceType
   ) {
      const userRepo = AppDataSource.getRepository(User);
      const notificationRepo = AppDataSource.getRepository(Notification);

      const user = await userRepo.findOneBy({ id: userId });
      if (!user) throw createError('User not found', 404);

      const notification = notificationRepo.create({
         user,
         type,
         message,
         reference_id: referenceId,
      });

      await notificationRepo.save(notification);
      return notification;
   }

   static async getNotifications(userId: string) {
      const notificationRepo = AppDataSource.getRepository(Notification);
      return notificationRepo.find({
         where: { user: { id: userId } },
         order: { created_at: 'DESC' },
      });
   }

   static async markAsRead(userId: string, notificationId: string) {
      const notificationRepo = AppDataSource.getRepository(Notification);

      const notification = await notificationRepo.findOne({
         where: { id: notificationId, user: { id: userId } },
      });
      if (!notification) throw createError('Notification not found', 404);

      notification.is_read = true;
      await notificationRepo.save(notification);
      return notification;
   }

   static async markAllAsRead(userId: string) {
      const notificationRepo = AppDataSource.getRepository(Notification);

      await notificationRepo.update({ user: { id: userId }, is_read: false }, { is_read: true });

      return { message: 'All notifications marked as read' };
   }
}
