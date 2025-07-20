import { User } from './User';
export type VerificationType = 'email_verification' | 'password_reset';
export declare class UserVerification {
    id: string;
    user: User;
    token: string;
    type: VerificationType;
    expires_at: Date;
    created_at: Date;
}
