import { User } from './User';
import { Quest } from './Quest';
export type ParticipantStatus = 'not_started' | 'in_progress' | 'completed' | 'failed';
export declare class QuestProgress {
    id: string;
    user: User;
    quest: Quest;
    status: ParticipantStatus;
    started_at?: Date;
    completed_at?: Date;
    created_at: Date;
    updated_at: Date;
}
