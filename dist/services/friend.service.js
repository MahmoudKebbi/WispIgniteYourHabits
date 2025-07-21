"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendService = void 0;
const db_1 = require("../repositories/db");
const Friend_1 = require("../models/Friend");
const FriendRequest_1 = require("../models/FriendRequest");
const User_1 = require("../models/User");
const errorHandler_1 = require("../utils/errorHandler");
const notification_service_1 = require("../services/notification.service");
class FriendService {
    static async sendFriendRequest(senderId, receiverId) {
        try {
            if (senderId === receiverId)
                throw (0, errorHandler_1.createError)('You cannot send a request to yourself', 400);
            const requestRepo = db_1.AppDataSource.getRepository(FriendRequest_1.FriendRequest);
            const userRepo = db_1.AppDataSource.getRepository(User_1.User);
            const sender = await userRepo.findOneBy({ id: senderId });
            const receiver = await userRepo.findOneBy({ id: receiverId });
            if (!receiver)
                throw (0, errorHandler_1.createError)('Receiver not found', 404);
            if (!sender)
                throw (0, errorHandler_1.createError)('Sender not found', 404);
            const existingRequest = await requestRepo.findOne({
                where: [
                    { sender: { id: senderId }, receiver: { id: receiverId } },
                    { sender: { id: receiverId }, receiver: { id: senderId } },
                ],
            });
            if (existingRequest)
                throw (0, errorHandler_1.createError)('Friend request already exists', 409);
            const request = requestRepo.create({
                sender: { id: senderId },
                receiver: { id: receiverId },
                status: 'pending',
            });
            await requestRepo.save(request);
            notification_service_1.NotificationService.sendNotification(senderId, 'friend_request_sent', `You sent a friend request to ${receiver.display_name}`, request.id);
            notification_service_1.NotificationService.sendNotification(receiverId, 'friend_request_received', `You received a friend request from ${sender.display_name}`, request.id);
            return request;
        }
        catch (err) {
            throw err.statusCode ? err : (0, errorHandler_1.createError)('Failed to send friend request', 500);
        }
    }
    static async respondToRequest(requestId, userId, action) {
        try {
            const requestRepo = db_1.AppDataSource.getRepository(FriendRequest_1.FriendRequest);
            const friendRepo = db_1.AppDataSource.getRepository(Friend_1.Friend);
            const request = await requestRepo.findOne({
                where: { id: requestId },
                relations: ['sender', 'receiver'],
            });
            if (!request)
                throw (0, errorHandler_1.createError)('Friend request not found', 404);
            if (request.receiver.id !== userId)
                throw (0, errorHandler_1.createError)('Unauthorized', 403);
            request.status =
                action === 'accept' ? 'accepted' : action === 'reject' ? 'rejected' : 'blocked';
            await requestRepo.save(request);
            if (request.status === 'accepted') {
                const [id1, id2] = [request.sender.id, request.receiver.id].sort();
                const friend = friendRepo.create({ user1: { id: id1 }, user2: { id: id2 } });
                await friendRepo.save(friend);
            }
            return request;
        }
        catch (err) {
            throw err.statusCode ? err : (0, errorHandler_1.createError)('Failed to respond to friend request', 500);
        }
    }
    static async getFriends(userId) {
        try {
            const friendRepo = db_1.AppDataSource.getRepository(Friend_1.Friend);
            const friends = await friendRepo.find({
                where: [{ user1: { id: userId } }, { user2: { id: userId } }],
                relations: ['user1', 'user2'],
            });
            return friends.map((f) => (f.user1.id === userId ? f.user2 : f.user1));
        }
        catch (err) {
            throw (0, errorHandler_1.createError)('Failed to fetch friends', 500);
        }
    }
    static async removeFriend(userId, friendId) {
        try {
            const friendRepo = db_1.AppDataSource.getRepository(Friend_1.Friend);
            const friendship = await friendRepo.findOne({
                where: [
                    { user1: { id: userId }, user2: { id: friendId } },
                    { user1: { id: friendId }, user2: { id: userId } },
                ],
            });
            if (!friendship)
                throw (0, errorHandler_1.createError)('Friend not found', 404);
            await friendRepo.remove(friendship);
            return { message: 'Friend removed' };
        }
        catch (err) {
            throw err.statusCode ? err : (0, errorHandler_1.createError)('Failed to remove friend', 500);
        }
    }
    static async getPendingRequests(userId) {
        try {
            const requestRepo = db_1.AppDataSource.getRepository(FriendRequest_1.FriendRequest);
            return await requestRepo.find({
                where: { receiver: { id: userId }, status: 'pending' },
                relations: ['sender'],
                order: { created_at: 'DESC' },
            });
        }
        catch (err) {
            throw (0, errorHandler_1.createError)('Failed to fetch pending requests', 500);
        }
    }
    static async getSentRequests(userId) {
        try {
            const requestRepo = db_1.AppDataSource.getRepository(FriendRequest_1.FriendRequest);
            return await requestRepo.find({
                where: { sender: { id: userId }, status: 'pending' },
                relations: ['receiver'],
                order: { created_at: 'DESC' },
            });
        }
        catch (err) {
            throw (0, errorHandler_1.createError)('Failed to fetch sent requests', 500);
        }
    }
    static async getFriendById(userId, friendId) {
        try {
            const friendRepo = db_1.AppDataSource.getRepository(Friend_1.Friend);
            const friendship = await friendRepo.findOne({
                where: [
                    { user1: { id: userId }, user2: { id: friendId } },
                    { user1: { id: friendId }, user2: { id: userId } },
                ],
                relations: ['user1', 'user2'],
            });
            if (!friendship)
                throw (0, errorHandler_1.createError)('Friend not found', 404);
            return friendship.user1.id === userId ? friendship.user2 : friendship.user1;
        }
        catch (err) {
            throw (0, errorHandler_1.createError)('Failed to fetch friend details', 500);
        }
    }
}
exports.FriendService = FriendService;
//# sourceMappingURL=friend.service.js.map