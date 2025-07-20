import { User } from './User';
export type FriendRequestStatus = 'pending' | 'accepted' | 'rejected' | 'blocked';
export declare class FriendRequest {
    id: string;
    sender: User;
    receiver: User;
    status: FriendRequestStatus;
    created_at: Date;
    updated_at: Date;
}
