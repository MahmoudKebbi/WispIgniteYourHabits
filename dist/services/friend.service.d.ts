import { FriendRequest } from '../models/FriendRequest';
import { User } from '../models/User';
export declare class FriendService {
    static sendFriendRequest(senderId: string, receiverId: string): Promise<FriendRequest>;
    static respondToRequest(requestId: string, userId: string, action: 'accept' | 'reject' | 'block'): Promise<FriendRequest>;
    static getFriends(userId: string): Promise<User[]>;
    static removeFriend(userId: string, friendId: string): Promise<{
        message: string;
    }>;
    static getPendingRequests(userId: string): Promise<FriendRequest[]>;
    static getSentRequests(userId: string): Promise<FriendRequest[]>;
    static getFriendById(userId: string, friendId: string): Promise<User>;
}
