import { User } from './User';
export declare class XpTransaction {
    id: string;
    user: User;
    amount: number;
    reason: string;
    reference_id?: string;
    created_at: Date;
}
