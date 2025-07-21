import { Request, Response } from 'express';
import { HabitEventsService } from '../services/habitEvents.service';

export class HabitEventsController {
   static async getHabitEventsByUser(req: Request, res: Response) {
      try {
         const user = req.user as { userId: string };
         const userId = user.userId;

         if (!userId) {
            console.error('User not authenticated');
            return res.status(400).json({ error: 'User not authenticated' });
         }

         const { habitId, startDate, endDate } = req.query;

         if (!habitId) {
            return res.status(400).json({ error: 'Habit ID is required' });
         }

         const events = await HabitEventsService.getEventsByUser(userId, {
            habitId: habitId as string,

            startDate: startDate as string,

            endDate: endDate as string,
         });

         return res.status(200).json({ events });
      } catch (err: any) {
         console.error('Get events error:', err);

         const statusCode = err.statusCode || 500;

         return res.status(statusCode).json({ error: err.message || 'Could not fetch events' });
      }
   }

   static async getAllHabitEvents(req: Request, res: Response) {
      try {
         const user = req.user as { userId: string };

         const userId = user.userId;

         if (!userId) {
            console.error('User not authenticated');

            return res.status(400).json({ error: 'User not authenticated' });
         }

         const events = await HabitEventsService.getAllHabitEvents(userId);

         return res.status(200).json({ events });
      } catch (err: any) {
         console.error('Get all habit events error:', err);

         const statusCode = err.statusCode || 500;

         return res.status(statusCode).json({ error: err.message || 'Could not fetch events' });
      }
   }

   static async getEventsByHabitId(req: Request, res: Response) {
      try {
         const user = req.user as { userId: string };

         const userId = user.userId;

         if (!userId) {
            console.error('User not authenticated');
            return res.status(400).json({ error: 'User not authenticated' });
         }

         const habitId = req.params.habitId;

         const events = await HabitEventsService.getEventsByHabitId(userId, habitId);

         return res.status(200).json({ events });
      } catch (err: any) {
         console.error('Get events by habit ID error:', err);

         const statusCode = err.statusCode || 500;

         return res.status(statusCode).json({ error: err.message || 'Could not get habit' });
      }
   }

   static async filterHabitEvents(req: Request, res: Response) {
      try {
         const user = req.user as { userId: string };

         const userId = user.userId;

         if (!userId) {
            console.error('User not authenticated');

            return res.status(400).json({ error: 'User not authenticated' });
         }

         const from = req.query.from ? new Date(req.query.from as string) : undefined;

         const to = req.query.to ? new Date(req.query.to as string) : undefined;

         const events = await HabitEventsService.filterHabitEvents(userId, from, to);

         return res.status(200).json({ events });
      } catch (err: any) {
         console.error('Filter habit events error:', err);
         const statusCode = err.statusCode || 500;
         return res.status(statusCode).json({ error: err.message || 'Could not filter events' });
      }
   }

   static async deleteHabitEvent(req: Request, res: Response) {
      try {
         const user = req.user as { userId: string };

         const userId = user.userId;

         if (!userId) {
            console.error('User not authenticated');
            return res.status(400).json({ error: 'User not authenticated' });
         }

         const eventId = req.params.eventId;

         const result = await HabitEventsService.deleteHabitEvent(userId, eventId);

         return res.status(200).json(result);
      } catch (err: any) {
         console.error('Delete habit event error:', err);

         const statusCode = err.statusCode || 500;

         return res.status(statusCode).json({ error: err.message || 'Could not delete event' });
      }
   }
}
