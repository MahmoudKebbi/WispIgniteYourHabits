import bcrypt from 'bcrypt';
import { User } from '../models/User';
import { UserVerification } from '../models/UserVerification';
import { generateToken, verifyToken } from '../utils/jwt';
import { sendVerificationEmail, sendPasswordResetEmail } from '../utils/email';
import { AppDataSource } from '../repositories/db';
import { createError } from '../utils/errorHandler';

// const SALT_ROUNDS = 12;

export class AuthService {
   static async signup({
      email,
      password,
      displayName,
   }: {
      email: string;
      password: string;
      displayName: string;
   }) {
      const userRepo = AppDataSource.getRepository(User);
      const verificationRepo = AppDataSource.getRepository(UserVerification);

      const existing = await userRepo.findOne({ where: { email } });
      if (existing) {
         throw createError('Email already in use', 400);
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = userRepo.create({
         email,
         password_hash: hashedPassword, // FIX: Use the hashed password variable
         display_name: displayName,
         role: 'user',
      });

      await userRepo.save(newUser);

      const token = generateToken(
         {
            userId: newUser.id,
            email: newUser.email,
            role: newUser.role,
         },
         '2h'
      );

      const verificationEntry = verificationRepo.create({
         user: newUser,
         token,
         type: 'email_verification',
         expires_at: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
      });

      await verificationRepo.save(verificationEntry);

      await sendVerificationEmail(email, token); // mock function for now

      return { message: 'Signup successful. Please verify your email.' };
   }

   static async signIn({ email, password, ip }: { email: string; password: string; ip?: string }) {
      const userRepo = AppDataSource.getRepository(User);

      const user = await userRepo.findOne({ where: { email } });
      console.log('User found:', user);
      if (!user) {
         throw createError('Invalid credentials', 401);
      }

      const isPasswordValid = await bcrypt.compare(password, user.password_hash);
      console.log('Password match:', isPasswordValid);
      if (!isPasswordValid) {
         throw createError('Invalid credentials', 401);
      }

      if (!user.email_verified) {
         throw createError('Please verify your email before logging in.', 403);
      }

      await userRepo.update(user.id, {
         last_login_at: new Date(),
         last_login_ip: ip || user.last_login_ip,
      });

      const token = generateToken(
         {
            userId: user.id,
            displayName: user.display_name,
            email: user.email,
            verified: user.email_verified,
            role: user.role,
         },
         '2h'
      );

      const { password_hash: _, ...userSafeData } = user;
      return {
         message: 'Login successful',
         token,
         user: userSafeData,
      };
   }

   static async verifyEmail(token: string) {
      const verificationRepo = AppDataSource.getRepository(UserVerification);
      const userRepo = AppDataSource.getRepository(User);

      let decoded;
      try {
         decoded = verifyToken<{ userId: string }>(token);
         console.log('Decoded token:', decoded);
      } catch {
         throw createError('Invalid or expired verification token', 400);
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
         throw createError('Verification token not found or already used', 400);
      }

      const user = entry.user;
      if (user.email_verified) {
         throw createError('User is already verified', 400);
      }

      user.email_verified = true;
      await userRepo.save(user);

      await verificationRepo.delete({
         user: { id: user.id },
         type: 'email_verification',
      });

      return { message: 'Email verified successfully' };
   }

   static async resendVerificationEmail(email: string) {
      const userRepo = AppDataSource.getRepository(User);
      const verificationRepo = AppDataSource.getRepository(UserVerification);

      const user = await userRepo.findOne({ where: { email } });

      if (!user) {
         throw createError('No account associated with this email', 404);
      }

      if (user.email_verified) {
         throw createError('User is already verified', 400);
      }

      await verificationRepo.delete({
         user: { id: user.id },
         type: 'email_verification',
      });

      const token = generateToken({ userId: user.id }, '15m');

      const newEntry = verificationRepo.create({
         user,
         token,
         type: 'email_verification',
         expires_at: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
      });

      await verificationRepo.save(newEntry);

      await sendVerificationEmail(user.email, token);

      return { message: 'Verification email resent successfully' };
   }

   static async forgotPassword(email: string) {
      const userRepo = AppDataSource.getRepository(User);
      const verificationRepo = AppDataSource.getRepository(UserVerification);

      const user = await userRepo.findOne({ where: { email } });
      if (!user) {
         throw createError('No account associated with this email', 404);
      }

      await verificationRepo.delete({
         user: { id: user.id },
         type: 'password_reset',
      });

      const token = generateToken({ userId: user.id }, '15m');

      const entry = verificationRepo.create({
         user,
         token,
         type: 'password_reset',
         expires_at: new Date(Date.now() + 15 * 60 * 1000),
      });

      await verificationRepo.save(entry);

      await sendPasswordResetEmail(user.email, token);

      return { message: 'Password reset email sent' };
   }

   static async resetPassword(token: string, newPassword: string) {
      const verificationRepo = AppDataSource.getRepository(UserVerification);
      const userRepo = AppDataSource.getRepository(User);

      let decoded;
      try {
         decoded = verifyToken<{ userId: string }>(token);
      } catch {
         throw createError('Invalid or expired password reset token', 400);
      }

      const entry = await verificationRepo.findOne({
         where: { user: { id: decoded.userId }, token, type: 'password_reset' },
         relations: ['user'],
      });

      if (!entry) {
         throw createError('Password reset token not found or already used', 400);
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

   static async changePassword(userId: string, currentPassword: string, newPassword: string) {
      const userRepo = AppDataSource.getRepository(User);
      const user = await userRepo.findOne({ where: { id: userId } });

      if (!user) throw createError('User not found', 404);

      const isMatch = await bcrypt.compare(currentPassword, user.password_hash);
      if (!isMatch) throw createError('Current password is incorrect', 400);

      user.password_hash = newPassword;

      await userRepo.save(user);

      return { message: 'Password changed successfully' };
   }

   static async updateProfile(
      userId: string,
      updates: { displayName?: string; avatarUrl?: string; email?: string }
   ) {
      const userRepo = AppDataSource.getRepository(User);
      const verificationRepo = AppDataSource.getRepository(UserVerification);
      const user = await userRepo.findOne({ where: { id: userId } });

      if (!user) throw createError('User not found', 404);

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
         const token = generateToken({ userId: user.id, email: user.email }, '2h');
         const verificationEntry = verificationRepo.create({
            user,
            token,
            type: 'email_verification',
            expires_at: new Date(Date.now() + 15 * 60 * 1000),
         });
         await verificationRepo.save(verificationEntry);
         await sendVerificationEmail(user.email, token);
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

   static async deleteUser(userId: string, password: string) {
      const userRepo = AppDataSource.getRepository(User);
      const user = await userRepo.findOne({ where: { id: userId } });

      if (!user) throw createError('User not found', 404);

      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) throw createError('Password is incorrect', 400);

      await userRepo.softDelete(userId);
      return { message: 'User deleted successfully' };
   }
}
