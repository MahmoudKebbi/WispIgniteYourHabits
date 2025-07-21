import { User } from './User';
export type NotificationType = 'friend_request_sent' | 'friend_request_received' | 'quest_update' | 'habit_reminder' | 'system';
export declare class Notification {
    id: string;
    user: User;
    type: NotificationType;
    message: string;
    is_read: boolean;
    reference_id?: string;
    created_at: Date;
}
