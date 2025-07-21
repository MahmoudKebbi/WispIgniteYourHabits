"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendController = void 0;
const friend_service_1 = require("../services/friend.service");
class FriendController {
    static async sendRequest(req, res) {
        try {
            const sender = req.user;
            const receiverId = req.body.receiverId;
            if (!sender?.userId)
                return res.status(401).json({ error: 'User not authenticated' });
            if (!receiverId)
                return res.status(400).json({ error: 'receiverId is required' });
            const request = await friend_service_1.FriendService.sendFriendRequest(sender.userId, receiverId);
            return res.status(201).json(request);
        }
        catch (err) {
            console.error('Send friend request error:', err);
            return res.status(err.statusCode || 500).json({ error: err.message });
        }
    }
    static async respondToRequest(req, res) {
        try {
            const user = req.user;
            const { requestId } = req.params;
            const { action } = req.body;
            if (!user?.userId)
                return res.status(401).json({ error: 'User not authenticated' });
            if (!['accept', 'reject', 'block'].includes(action))
                return res.status(400).json({ error: 'Invalid action' });
            const response = await friend_service_1.FriendService.respondToRequest(requestId, user.userId, action);
            return res.json(response);
        }
        catch (err) {
            console.error('Respond to request error:', err);
            return res.status(err.statusCode || 500).json({ error: err.message });
        }
    }
    static async getFriends(req, res) {
        try {
            const user = req.user;
            if (!user?.userId)
                return res.status(401).json({ error: 'User not authenticated' });
            const friends = await friend_service_1.FriendService.getFriends(user.userId);
            return res.json(friends);
        }
        catch (err) {
            console.error('Get friends error:', err);
            return res.status(err.statusCode || 500).json({ error: err.message });
        }
    }
    static async removeFriend(req, res) {
        try {
            const user = req.user;
            const { friendId } = req.params;
            if (!user?.userId)
                return res.status(401).json({ error: 'User not authenticated' });
            if (!friendId)
                return res.status(400).json({ error: 'friendId is required' });
            const result = await friend_service_1.FriendService.removeFriend(user.userId, friendId);
            return res.json(result);
        }
        catch (err) {
            console.error('Remove friend error:', err);
            return res.status(err.statusCode || 500).json({ error: err.message });
        }
    }
    static async getPendingRequests(req, res) {
        try {
            const user = req.user;
            if (!user?.userId)
                return res.status(401).json({ error: 'User not authenticated' });
            const requests = await friend_service_1.FriendService.getPendingRequests(user.userId);
            return res.json(requests);
        }
        catch (err) {
            console.error('Get pending requests error:', err);
            return res.status(err.statusCode || 500).json({ error: err.message });
        }
    }
    static async getSentRequests(req, res) {
        try {
            const user = req.user;
            if (!user?.userId)
                return res.status(401).json({ error: 'User not authenticated' });
            const requests = await friend_service_1.FriendService.getSentRequests(user.userId);
            return res.json(requests);
        }
        catch (err) {
            console.error('Get sent requests error:', err);
            return res.status(err.statusCode || 500).json({ error: err.message });
        }
    }
    static async getFriendById(req, res) {
        try {
            const user = req.user;
            const { friendId } = req.params;
            if (!user?.userId)
                return res.status(401).json({ error: 'User not authenticated' });
            if (!friendId)
                return res.status(400).json({ error: 'friendId is required' });
            const friend = await friend_service_1.FriendService.getFriendById(user.userId, friendId);
            return res.json(friend);
        }
        catch (err) {
            console.error('Get friend by ID error:', err);
            return res.status(err.statusCode || 500).json({ error: err.message });
        }
    }
}
exports.FriendController = FriendController;
//# sourceMappingURL=friends.controller.js.map