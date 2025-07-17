import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

const redirectUrl = 'https://www.google.com'; // Replace with your actual redirect URL

export class AuthController {


  static async signup(req: Request, res: Response) {
    try {
      console.log('Signup request received');
      const { email, password, displayName } = req.body;

      const result = await AuthService.signup({ email, password, displayName });
      console.log('Signup successful:', result);
      return res.status(201).json(result);
    } catch (err: any) {
      console.error('Signup error:', err);
      return res.status(400).json({ error: err.message || 'Signup failed' });
    }
  }
static async login(req: Request, res: Response){
  try{
    console.log('Login request received');
    const { email, password } = req.body;
    // Get IP address (works behind proxies too)
    const ip = req.headers['x-forwarded-for']?.toString().split(',')[0] || req.socket.remoteAddress || '';
    const result = await AuthService.signIn({ email, password, ip });
    console.log('Login successful:', result);
      return res.status(201).json(result);
    } catch (err: any) {
      console.error('Signup error:', err);
      return res.status(400).json({ error: err.message || 'Signup failed' });
    }
}

 static async me(req: Request, res: Response) {
  res.status(201).json(req.user); // `req.user` comes from middleware
}

 static async verifyEmail(req: Request, res: Response) {
    try {
      console.log('Email verification request received');
      const token = req.query.token as string;
      if (!token) {
        return res.status(400).json({ error: 'Token is required' });
      }

      const result = await AuthService.verifyEmail(token);
      console.log('Email verification successful:', result);
      return res.redirect(redirectUrl); // Redirect to a success page or home page
    } catch (err: any) {
      console.error('Email verification error:', err);
      return res.status(400).json({ error: err.message || 'Verification failed' });
    }
  }

  static async resendVerificationEmail(req: Request, res: Response) {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ error: 'Email is required' });
      }

      const result = await AuthService.resendVerificationEmail(email);
      return res.status(200).json(result);
    } catch (err: any) {
      console.error('Resend verification email error:', err);
      return res.status(400).json({ error: err.message || 'Resend failed' });
    }
  }

  static async forgotPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ error: 'Email is required' });
      }

      const result = await AuthService.forgotPassword(email);
      return res.status(200).json(result);
    } catch (err: any) {
      console.error('Reset password error:', err);
      return res.status(400).json({ error: err.message || 'Reset failed' });
    }
  }

  static async resetPassword(req: Request, res: Response) {
    try {
      const { token, newPassword } = req.body;
      if (!token || !newPassword) {
        return res.status(400).json({ error: 'Token and new password are required' });
      }

      const result = await AuthService.resetPassword(token, newPassword);
      return res.status(200).json(result);
    } catch (err: any) {
      console.error('Reset password error:', err);
      return res.status(400).json({ error: err.message || 'Reset failed' });
    }
  }

static async changePassword(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(400).json({ error: 'User information is missing' });
    }
    const user = req.user as { id: string }; 
    const userId = user?.id; // assuming user ID is attached by auth middleware
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Both current and new passwords are required' });
    }

    const result = await AuthService.changePassword(userId, currentPassword, newPassword);
    return res.status(200).json(result);
  } catch (err: any) {
    console.error('Change password error:', err);
    return res.status(400).json({ error: err.message || 'Could not change password' });
  }
  
}

static async updateProfile(req: Request, res: Response) {
  try {
    console.log('Update profile request received');
    console.log('Request user:', req.user);
    const user = req.user as { userId: string } | null;
    const userId = user?.userId;
    console.log('User ID:', userId);
    if (!userId) {
      console.error('User ID is missing in request');
      return res.status(400).json({ error: 'User information is missing' });
    }
    const { displayName, avatarUrl, email } = req.body;
    console.log('Profile update data:', { displayName, avatarUrl, email });

    const result = await AuthService.updateProfile(userId, { displayName, avatarUrl, email });
    return res.status(200).json(result);
  } catch (err: any) {
    console.error('Update profile error:', err);
    return res.status(400).json({ error: err.message || 'Could not update profile' });
  }
}

static async deleteUser(req: Request, res: Response) {
  try {
    const user = req.user as { id: string } | null;
    const userId = user?.id;
    if (!userId) {
      return res.status(400).json({ error: 'User information is missing' });
    }

    const result = await AuthService.deleteUser(userId);
    return res.status(200).json(result);
  } catch (err: any) {
    console.error('Delete user error:', err);
    return res.status(400).json({ error: err.message || 'Could not delete user' });
  }
}

}

