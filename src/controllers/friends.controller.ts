import { Request, Response } from 'express';
import { FriendService } from '../services/friend.service';

export class FriendController {
   static async sendRequest(req: Request, res: Response) {
      try {
         const sender = req.user as { userId: string };
         const receiverId = req.body.receiverId;

         if (!sender?.userId) return res.status(401).json({ error: 'User not authenticated' });
         if (!receiverId) return res.status(400).json({ error: 'receiverId is required' });

         const request = await FriendService.sendFriendRequest(sender.userId, receiverId);
         return res.status(201).json(request);
      } catch (err: any) {
         console.error('Send friend request error:', err);
         return res.status(err.statusCode || 500).json({ error: err.message });
      }
   }

   static async respondToRequest(req: Request, res: Response) {
      try {
         const user = req.user as { userId: string };
         const { requestId } = req.params;
         const { action } = req.body;

         if (!user?.userId) return res.status(401).json({ error: 'User not authenticated' });
         if (!['accept', 'reject', 'block'].includes(action))
            return res.status(400).json({ error: 'Invalid action' });

         const response = await FriendService.respondToRequest(requestId, user.userId, action);
         return res.json(response);
      } catch (err: any) {
         console.error('Respond to request error:', err);
         return res.status(err.statusCode || 500).json({ error: err.message });
      }
   }

   static async getFriends(req: Request, res: Response) {
      try {
         const user = req.user as { userId: string };
         if (!user?.userId) return res.status(401).json({ error: 'User not authenticated' });

         const friends = await FriendService.getFriends(user.userId);
         return res.json(friends);
      } catch (err: any) {
         console.error('Get friends error:', err);
         return res.status(err.statusCode || 500).json({ error: err.message });
      }
   }

   static async removeFriend(req: Request, res: Response) {
      try {
         const user = req.user as { userId: string };
         const { friendId } = req.params;

         if (!user?.userId) return res.status(401).json({ error: 'User not authenticated' });
         if (!friendId) return res.status(400).json({ error: 'friendId is required' });

         const result = await FriendService.removeFriend(user.userId, friendId);
         return res.json(result);
      } catch (err: any) {
         console.error('Remove friend error:', err);
         return res.status(err.statusCode || 500).json({ error: err.message });
      }
   }

   static async getPendingRequests(req: Request, res: Response) {
      try {
         const user = req.user as { userId: string };
         if (!user?.userId) return res.status(401).json({ error: 'User not authenticated' });

         const requests = await FriendService.getPendingRequests(user.userId);
         return res.json(requests);
      } catch (err: any) {
         console.error('Get pending requests error:', err);
         return res.status(err.statusCode || 500).json({ error: err.message });
      }
   }

   static async getSentRequests(req: Request, res: Response) {
      try {
         const user = req.user as { userId: string };
         if (!user?.userId) return res.status(401).json({ error: 'User not authenticated' });

         const requests = await FriendService.getSentRequests(user.userId);
         return res.json(requests);
      } catch (err: any) {
         console.error('Get sent requests error:', err);
         return res.status(err.statusCode || 500).json({ error: err.message });
      }
   }
   static async getFriendById(req: Request, res: Response) {
      try {
         const user = req.user as { userId: string };
         const { friendId } = req.params;

         if (!user?.userId) return res.status(401).json({ error: 'User not authenticated' });
         if (!friendId) return res.status(400).json({ error: 'friendId is required' });

         const friend = await FriendService.getFriendById(user.userId, friendId);
         return res.json(friend);
      } catch (err: any) {
         console.error('Get friend by ID error:', err);
         return res.status(err.statusCode || 500).json({ error: err.message });
      }
   }
}
