import { User } from './User';
export type NotificationType = 'friend_request' | 'quest_update' | 'habit_reminder' | 'system';
export declare class Notification {
    id: string;
    user: User;
    type: NotificationType;
    message: string;
    is_read: boolean;
    reference_id?: string;
    created_at: Date;
}
