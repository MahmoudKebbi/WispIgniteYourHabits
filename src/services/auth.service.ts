import bcrypt from 'bcrypt';
import { User } from '../models/User';
import { UserVerification } from '../models/UserVerification';
import { generateToken, verifyToken } from '../utils/jwt'; // for email verification
import { sendVerificationEmail, sendPasswordResetEmail } from '../utils/email'; // (stub for now)
import { AppDataSource } from '../repositories/db'; // Assuming you have a data source setup

const SALT_ROUNDS = 12;

export class AuthService {
  

  static async signup({ email, password, displayName }: {
    email: string;
    password: string;
    displayName: string;
  }) {
    const userRepo = AppDataSource.getRepository(User);
    const verificationRepo = AppDataSource.getRepository(UserVerification);

    const existing = await userRepo.findOne({ where: { email } });
    if (existing) {
      throw new Error('Email already in use');
    }

    const newUser = userRepo.create({
      email,
      password_hash: password,
      display_name: displayName,
      role: 'user', 
    });

    await userRepo.save(newUser);

    // Create a verification token (could also be UUID)
    const token = generateToken({ userId: newUser.id, displayName: newUser.display_name, email: newUser.email, verified: newUser.email_verified, role: newUser.role  }, '2h');

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
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    console.log('Password match:', isPasswordValid);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    if (!user.email_verified) {
      throw new Error('Please verify your email before logging in.');
    }

    // Update login so password hash does not change
    await userRepo.update(user.id, { 
      last_login_at: new Date(),
      last_login_ip: ip || user.last_login_ip 
    });



    const token = generateToken({ userId: user.id, displayName: user.display_name, email: user.email, verified: user.email_verified, role: user.role  }, '2h');



    // return user details excluding password
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
      throw new Error('Invalid or expired verification token');
    }

    const entry = await verificationRepo.findOne({
      where: { user: { id: decoded.userId }, token, type: 'email_verification' },
      relations: ['user'],
    });

    if (!entry) {
      throw new Error('Verification token not found or already used');
    }

    const user = entry.user;
    if (user.email_verified) {
      throw new Error('User is already verified');
    }

    user.email_verified = true;
    await userRepo.save(user);

    // Clean up all verification tokens for this user
    await verificationRepo.delete({ user: { id: user.id }, type: 'email_verification' });

    return { message: 'Email verified successfully' };
  }


  static async resendVerificationEmail(email: string) {
  const userRepo = AppDataSource.getRepository(User);
  const verificationRepo = AppDataSource.getRepository(UserVerification);

  const user = await userRepo.findOne({ where: { email } });

  if (!user) {
    throw new Error('No account associated with this email');
  }

  if (user.email_verified) {
    throw new Error('User is already verified');
  }

  await verificationRepo.delete({ user: { id: user.id }, type: 'email_verification' });

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
    throw new Error('No account associated with this email');
  }

  // Remove old reset tokens
  await verificationRepo.delete({ user: { id: user.id }, type: 'password_reset' });

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
      throw new Error('Invalid or expired password reset token');
    }

    const entry = await verificationRepo.findOne({
      where: { user: { id: decoded.userId }, token, type: 'password_reset' },
      relations: ['user'],
    });

    if (!entry) {
      throw new Error('Password reset token not found or already used');
    }

    const user = entry.user;

    user.password_hash = newPassword;

    await userRepo.save(user);

    // Clean up all password reset tokens for this user
    await verificationRepo.delete({ user: { id: user.id }, type: 'password_reset' });

    return { message: 'Password reset successfully' };
  }

  static async changePassword(userId: string, currentPassword: string, newPassword: string) {
  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOne({ where: { id: userId } });

  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(currentPassword, user.password_hash);
  if (!isMatch) throw new Error('Current password is incorrect');

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

  if (!user) throw new Error('User not found');

  let emailChanged = false;

  if (updates.displayName !== undefined) {
    user.display_name = updates.displayName;
  }
  if (updates.avatarUrl !== undefined) {
    user.avatar_url = updates.avatarUrl;
  }
  if (updates.email !== undefined && updates.email !== user.email) {
    // Email changed
    user.email = updates.email;
    user.email_verified = false;
    emailChanged = true;
  }

  await userRepo.save(user);

  // If email changed, send verification
  if (emailChanged) {
    // Remove old verifications
    await verificationRepo.delete({ user: { id: user.id }, type: 'email_verification' });
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


static async deleteUser(userId: string) {
  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOne({ where: { id: userId } });

  if (!user) throw new Error('User not found');

  await userRepo.softDelete(userId); // Uses TypeORM's soft delete (sets deleted_at)
  return { message: 'User deleted successfully' };
}

}
