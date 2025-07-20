export declare class AuthService {
    static signup({ email, password, displayName, }: {
        email: string;
        password: string;
        displayName: string;
    }): Promise<{
        message: string;
    }>;
    static signIn({ email, password, ip }: {
        email: string;
        password: string;
        ip?: string;
    }): Promise<{
        message: string;
        token: string;
        user: {
            id: string;
            email: string;
            display_name: string;
            avatar_url?: string;
            role: import("../models/User").UserRole;
            email_verified: boolean;
            email_verification_token?: string;
            is_active: boolean;
            deleted_at?: Date;
            last_login_at?: Date;
            last_login_ip?: string;
            created_at: Date;
            updated_at: Date;
        };
    }>;
    static verifyEmail(token: string): Promise<{
        message: string;
    }>;
    static resendVerificationEmail(email: string): Promise<{
        message: string;
    }>;
    static forgotPassword(email: string): Promise<{
        message: string;
    }>;
    static resetPassword(token: string, newPassword: string): Promise<{
        message: string;
    }>;
    static changePassword(userId: string, currentPassword: string, newPassword: string): Promise<{
        message: string;
    }>;
    static updateProfile(userId: string, updates: {
        displayName?: string;
        avatarUrl?: string;
        email?: string;
    }): Promise<{
        emailVerificationSent?: boolean | undefined;
        message: string;
        profile: {
            id: string;
            displayName: string;
            avatarUrl: string | undefined;
            email: string;
            emailVerified: boolean;
        };
    }>;
    static deleteUser(userId: string, password: string): Promise<{
        message: string;
    }>;
}
