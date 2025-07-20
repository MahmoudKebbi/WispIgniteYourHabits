"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const tslib_1 = require("tslib");
const bcrypt_1 = tslib_1.__importDefault(require("bcrypt"));
const User_1 = require("../models/User");
const UserVerification_1 = require("../models/UserVerification");
const jwt_1 = require("../utils/jwt");
const email_1 = require("../utils/email");
const db_1 = require("../repositories/db");
const errorHandler_1 = require("../utils/errorHandler");
// const SALT_ROUNDS = 12;
class AuthService {
    static async signup({ email, password, displayName, }) {
        const userRepo = db_1.AppDataSource.getRepository(User_1.User);
        const verificationRepo = db_1.AppDataSource.getRepository(UserVerification_1.UserVerification);
        const existing = await userRepo.findOne({ where: { email } });
        if (existing) {
            throw (0, errorHandler_1.createError)('Email already in use', 400);
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 12);
        const newUser = userRepo.create({
            email,
            password_hash: hashedPassword, // FIX: Use the hashed password variable
            display_name: displayName,
            role: 'user',
        });
        await userRepo.save(newUser);
        const token = (0, jwt_1.generateToken)({
            userId: newUser.id,
            email: newUser.email,
            role: newUser.role,
        }, '2h');
        const verificationEntry = verificationRepo.create({
            user: newUser,
            token,
            type: 'email_verification',
            expires_at: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
        });
        await verificationRepo.save(verificationEntry);
        await (0, email_1.sendVerificationEmail)(email, token); // mock function for now
        return { message: 'Signup successful. Please verify your email.' };
    }
    static async signIn({ email, password, ip }) {
        const userRepo = db_1.AppDataSource.getRepository(User_1.User);
        const user = await userRepo.findOne({ where: { email } });
        console.log('User found:', user);
        if (!user) {
            throw (0, errorHandler_1.createError)('Invalid credentials', 401);
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password_hash);
        console.log('Password match:', isPasswordValid);
        if (!isPasswordValid) {
            throw (0, errorHandler_1.createError)('Invalid credentials', 401);
        }
        if (!user.email_verified) {
            throw (0, errorHandler_1.createError)('Please verify your email before logging in.', 403);
        }
        await userRepo.update(user.id, {
            last_login_at: new Date(),
            last_login_ip: ip || user.last_login_ip,
        });
        const token = (0, jwt_1.generateToken)({
            userId: user.id,
            displayName: user.display_name,
            email: user.email,
            verified: user.email_verified,
            role: user.role,
        }, '2h');
        const { password_hash: _, ...userSafeData } = user;
        return {
            message: 'Login successful',
            token,
            user: userSafeData,
        };
    }
    static async verifyEmail(token) {
        const verificationRepo = db_1.AppDataSource.getRepository(UserVerification_1.UserVerification);
        const userRepo = db_1.AppDataSource.getRepository(User_1.User);
        let decoded;
        try {
            decoded = (0, jwt_1.verifyToken)(token);
            console.log('Decoded token:', decoded);
        }
        catch {
            throw (0, errorHandler_1.createError)('Invalid or expired verification token', 400);
        }
        const entry = await verificationRepo.findOne({
            where: {
                user: { id: decoded.userId },
                token,
                type: 'email_verification',
            },
            relations: ['user'],
        });
        if (!entry) {
            throw (0, errorHandler_1.createError)('Verification token not found or already used', 400);
        }
        const user = entry.user;
        if (user.email_verified) {
            throw (0, errorHandler_1.createError)('User is already verified', 400);
        }
        user.email_verified = true;
        await userRepo.save(user);
        await verificationRepo.delete({
            user: { id: user.id },
            type: 'email_verification',
        });
        return { message: 'Email verified successfully' };
    }
    static async resendVerificationEmail(email) {
        const userRepo = db_1.AppDataSource.getRepository(User_1.User);
        const verificationRepo = db_1.AppDataSource.getRepository(UserVerification_1.UserVerification);
        const user = await userRepo.findOne({ where: { email } });
        if (!user) {
            throw (0, errorHandler_1.createError)('No account associated with this email', 404);
        }
        if (user.email_verified) {
            throw (0, errorHandler_1.createError)('User is already verified', 400);
        }
        await verificationRepo.delete({
            user: { id: user.id },
            type: 'email_verification',
        });
        const token = (0, jwt_1.generateToken)({ userId: user.id }, '15m');
        const newEntry = verificationRepo.create({
            user,
            token,
            type: 'email_verification',
            expires_at: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
        });
        await verificationRepo.save(newEntry);
        await (0, email_1.sendVerificationEmail)(user.email, token);
        return { message: 'Verification email resent successfully' };
    }
    static async forgotPassword(email) {
        const userRepo = db_1.AppDataSource.getRepository(User_1.User);
        const verificationRepo = db_1.AppDataSource.getRepository(UserVerification_1.UserVerification);
        const user = await userRepo.findOne({ where: { email } });
        if (!user) {
            throw (0, errorHandler_1.createError)('No account associated with this email', 404);
        }
        await verificationRepo.delete({
            user: { id: user.id },
            type: 'password_reset',
        });
        const token = (0, jwt_1.generateToken)({ userId: user.id }, '15m');
        const entry = verificationRepo.create({
            user,
            token,
            type: 'password_reset',
            expires_at: new Date(Date.now() + 15 * 60 * 1000),
        });
        await verificationRepo.save(entry);
        await (0, email_1.sendPasswordResetEmail)(user.email, token);
        return { message: 'Password reset email sent' };
    }
    static async resetPassword(token, newPassword) {
        const verificationRepo = db_1.AppDataSource.getRepository(UserVerification_1.UserVerification);
        const userRepo = db_1.AppDataSource.getRepository(User_1.User);
        let decoded;
        try {
            decoded = (0, jwt_1.verifyToken)(token);
        }
        catch {
            throw (0, errorHandler_1.createError)('Invalid or expired password reset token', 400);
        }
        const entry = await verificationRepo.findOne({
            where: { user: { id: decoded.userId }, token, type: 'password_reset' },
            relations: ['user'],
        });
        if (!entry) {
            throw (0, errorHandler_1.createError)('Password reset token not found or already used', 400);
        }
        const user = entry.user;
        user.password_hash = newPassword;
        await userRepo.save(user);
        await verificationRepo.delete({
            user: { id: user.id },
            type: 'password_reset',
        });
        return { message: 'Password reset successfully' };
    }
    static async changePassword(userId, currentPassword, newPassword) {
        const userRepo = db_1.AppDataSource.getRepository(User_1.User);
        const user = await userRepo.findOne({ where: { id: userId } });
        if (!user)
            throw (0, errorHandler_1.createError)('User not found', 404);
        const isMatch = await bcrypt_1.default.compare(currentPassword, user.password_hash);
        if (!isMatch)
            throw (0, errorHandler_1.createError)('Current password is incorrect', 400);
        user.password_hash = newPassword;
        await userRepo.save(user);
        return { message: 'Password changed successfully' };
    }
    static async updateProfile(userId, updates) {
        const userRepo = db_1.AppDataSource.getRepository(User_1.User);
        const verificationRepo = db_1.AppDataSource.getRepository(UserVerification_1.UserVerification);
        const user = await userRepo.findOne({ where: { id: userId } });
        if (!user)
            throw (0, errorHandler_1.createError)('User not found', 404);
        let emailChanged = false;
        if (updates.displayName !== undefined) {
            user.display_name = updates.displayName;
        }
        if (updates.avatarUrl !== undefined) {
            user.avatar_url = updates.avatarUrl;
        }
        if (updates.email !== undefined && updates.email !== user.email) {
            user.email = updates.email;
            user.email_verified = false;
            emailChanged = true;
        }
        await userRepo.save(user);
        if (emailChanged) {
            await verificationRepo.delete({
                user: { id: user.id },
                type: 'email_verification',
            });
            const token = (0, jwt_1.generateToken)({ userId: user.id, email: user.email }, '2h');
            const verificationEntry = verificationRepo.create({
                user,
                token,
                type: 'email_verification',
                expires_at: new Date(Date.now() + 15 * 60 * 1000),
            });
            await verificationRepo.save(verificationEntry);
            await (0, email_1.sendVerificationEmail)(user.email, token);
        }
        return {
            message: 'Profile updated successfully',
            profile: {
                id: user.id,
                displayName: user.display_name,
                avatarUrl: user.avatar_url,
                email: user.email,
                emailVerified: user.email_verified,
            },
            ...(emailChanged && { emailVerificationSent: true }),
        };
    }
    static async deleteUser(userId, password) {
        const userRepo = db_1.AppDataSource.getRepository(User_1.User);
        const user = await userRepo.findOne({ where: { id: userId } });
        if (!user)
            throw (0, errorHandler_1.createError)('User not found', 404);
        const isMatch = await bcrypt_1.default.compare(password, user.password_hash);
        if (!isMatch)
            throw (0, errorHandler_1.createError)('Password is incorrect', 400);
        await userRepo.softDelete(userId);
        return { message: 'User deleted successfully' };
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map