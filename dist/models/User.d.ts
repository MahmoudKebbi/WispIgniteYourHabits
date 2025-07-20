export type UserRole = 'user' | 'admin';
export declare class User {
    id: string;
    email: string;
    password_hash: string;
    display_name: string;
    avatar_url?: string;
    role: UserRole;
    email_verified: boolean;
    email_verification_token?: string;
    is_active: boolean;
    deleted_at?: Date;
    last_login_at?: Date;
    last_login_ip?: string;
    created_at: Date;
    updated_at: Date;
    normalizeEmail(): void;
    comparePassword(plain: string): Promise<boolean>;
}
