import { Request, Response } from 'express';
import { NotificationService } from '../services/notification.service';

export class NotificationController {
   static async getNotifications(req: Request, res: Response) {
      try {
         const user = req.user as { userId: string };
         if (!user?.userId) {
            return res.status(401).json({ error: 'User not authenticated' });
         }
         const notifications = await NotificationService.getNotifications(user.userId);
         return res.json(notifications);
      } catch (err: any) {
         console.error('Get notifications error:', err);
         const statusCode = err.statusCode || 500;
         return res
            .status(statusCode)
            .json({ error: err.message || 'Could not fetch notifications' });
      }
   }

   static async markAsRead(req: Request, res: Response) {
      try {
         const user = req.user as { userId: string };
         if (!user?.userId) {
            return res.status(401).json({ error: 'User not authenticated' });
         }
         const notificationId = req.params.id;
         if (!notificationId) {
            return res.status(400).json({ error: 'Notification ID is required' });
         }
         const updated = await NotificationService.markAsRead(user.userId, notificationId);
         return res.json(updated);
      } catch (err: any) {
         console.error('Mark notification as read error:', err);
         const statusCode = err.statusCode || 500;
         return res
            .status(statusCode)
            .json({ error: err.message || 'Could not mark notification as read' });
      }
   }

   static async markAllAsRead(req: Request, res: Response) {
      try {
         const user = req.user as { userId: string };
         if (!user?.userId) {
            return res.status(401).json({ error: 'User not authenticated' });
         }
         const updated = await NotificationService.markAllAsRead(user.userId);
         return res.json(updated);
      } catch (err: any) {
         console.error('Mark all notifications as read error:', err);
         const statusCode = err.statusCode || 500;
         return res
            .status(statusCode)
            .json({ error: err.message || 'Could not mark notifications as read' });
      }
   }
}
