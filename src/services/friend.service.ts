import { AppDataSource } from '../repositories/db';
import { Friend } from '../models/Friend';
import { FriendRequest } from '../models/FriendRequest';
import { User } from '../models/User';
import { createError } from '../utils/errorHandler';
import { NotificationService } from '../services/notification.service';

export class FriendService {
   static async sendFriendRequest(senderId: string, receiverId: string) {
      try {
         if (senderId === receiverId)
            throw createError('You cannot send a request to yourself', 400);

         const requestRepo = AppDataSource.getRepository(FriendRequest);
         const userRepo = AppDataSource.getRepository(User);
         const sender = await userRepo.findOneBy({ id: senderId });
         const receiver = await userRepo.findOneBy({ id: receiverId });
         if (!receiver) throw createError('Receiver not found', 404);
         if (!sender) throw createError('Sender not found', 404);

         const existingRequest = await requestRepo.findOne({
            where: [
               { sender: { id: senderId }, receiver: { id: receiverId } },
               { sender: { id: receiverId }, receiver: { id: senderId } },
            ],
         });
         if (existingRequest) throw createError('Friend request already exists', 409);

         const request = requestRepo.create({
            sender: { id: senderId },
            receiver: { id: receiverId },
            status: 'pending',
         });
         await requestRepo.save(request);
         NotificationService.sendNotification(
            senderId,
            'friend_request_sent',
            `You sent a friend request to ${receiver.display_name}`,
            request.id
         );
         NotificationService.sendNotification(
            receiverId,
            'friend_request_received',
            `You received a friend request from ${sender.display_name}`,
            request.id
         );
         return request;
      } catch (err: any) {
         throw err.statusCode ? err : createError('Failed to send friend request', 500);
      }
   }

   static async respondToRequest(
      requestId: string,
      userId: string,
      action: 'accept' | 'reject' | 'block'
   ) {
      try {
         const requestRepo = AppDataSource.getRepository(FriendRequest);
         const friendRepo = AppDataSource.getRepository(Friend);

         const request = await requestRepo.findOne({
            where: { id: requestId },
            relations: ['sender', 'receiver'],
         });

         if (!request) throw createError('Friend request not found', 404);
         if (request.receiver.id !== userId) throw createError('Unauthorized', 403);

         request.status =
            action === 'accept' ? 'accepted' : action === 'reject' ? 'rejected' : 'blocked';
         await requestRepo.save(request);

         if (request.status === 'accepted') {
            const [id1, id2] = [request.sender.id, request.receiver.id].sort();
            const friend = friendRepo.create({ user1: { id: id1 }, user2: { id: id2 } });
            await friendRepo.save(friend);
         }

         return request;
      } catch (err: any) {
         throw err.statusCode ? err : createError('Failed to respond to friend request', 500);
      }
   }

   static async getFriends(userId: string) {
      try {
         const friendRepo = AppDataSource.getRepository(Friend);

         const friends = await friendRepo.find({
            where: [{ user1: { id: userId } }, { user2: { id: userId } }],
            relations: ['user1', 'user2'],
         });

         return friends.map((f) => (f.user1.id === userId ? f.user2 : f.user1));
      } catch (err: any) {
         throw createError('Failed to fetch friends', 500);
      }
   }

   static async removeFriend(userId: string, friendId: string) {
      try {
         const friendRepo = AppDataSource.getRepository(Friend);
         const friendship = await friendRepo.findOne({
            where: [
               { user1: { id: userId }, user2: { id: friendId } },
               { user1: { id: friendId }, user2: { id: userId } },
            ],
         });
         if (!friendship) throw createError('Friend not found', 404);

         await friendRepo.remove(friendship);
         return { message: 'Friend removed' };
      } catch (err: any) {
         throw err.statusCode ? err : createError('Failed to remove friend', 500);
      }
   }

   static async getPendingRequests(userId: string) {
      try {
         const requestRepo = AppDataSource.getRepository(FriendRequest);
         return await requestRepo.find({
            where: { receiver: { id: userId }, status: 'pending' },
            relations: ['sender'],
            order: { created_at: 'DESC' },
         });
      } catch (err: any) {
         throw createError('Failed to fetch pending requests', 500);
      }
   }

   static async getSentRequests(userId: string) {
      try {
         const requestRepo = AppDataSource.getRepository(FriendRequest);
         return await requestRepo.find({
            where: { sender: { id: userId }, status: 'pending' },
            relations: ['receiver'],
            order: { created_at: 'DESC' },
         });
      } catch (err: any) {
         throw createError('Failed to fetch sent requests', 500);
      }
   }

   static async getFriendById(userId: string, friendId: string) {
      try {
         const friendRepo = AppDataSource.getRepository(Friend);
         const friendship = await friendRepo.findOne({
            where: [
               { user1: { id: userId }, user2: { id: friendId } },
               { user1: { id: friendId }, user2: { id: userId } },
            ],
            relations: ['user1', 'user2'],
         });
         if (!friendship) throw createError('Friend not found', 404);
         return friendship.user1.id === userId ? friendship.user2 : friendship.user1;
      } catch (err: any) {
         throw createError('Failed to fetch friend details', 500);
      }
   }
}
