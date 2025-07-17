import { z } from 'zod';

// Base email validator with detailed errors
const emailSchema = z
  .string()
  .nonempty('Email is required')
  .email('Invalid email format');

// Base password validator with complexity requirements
const passwordSchema = z
  .string()
  .nonempty('Password is required')
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

export const authSchema = {
  // Signup validation
  signup: z.object({
    body: z.object({
      email: emailSchema,
      password: passwordSchema,
      displayName: z
        .string()
        .nonempty('Display name is required')
        .min(2, 'Display name must be at least 2 characters')
        .max(50, 'Display name cannot exceed 50 characters'),
    }),
  }),

  // Login validation
  login: z.object({
    body: z.object({
      email: emailSchema,
      password: z.string().nonempty('Password is required'),
    }),
  }),

  // Resend verification email validation
  resendVerificationEmail: z.object({
    body: z.object({
      email: emailSchema,
    }),
  }),

  // Forgot password validation
  forgotPassword: z.object({
    body: z.object({
      email: emailSchema,
    }),
  }),

  // Reset password validation
  resetPassword: z.object({
    body: z.object({
      token: z.string().nonempty('Token is required'),
      newPassword: passwordSchema,
    }),
  }),

  // Change password validation
  changePassword: z.object({
    body: z.object({
      currentPassword: z.string().nonempty('Current password is required'),
      newPassword: passwordSchema,
    }),
  }),

  // Update profile validation
  updateProfile: z.object({
    body: z.object({
      displayName: z
        .string()
        .min(2, 'Display name must be at least 2 characters')
        .max(50, 'Display name cannot exceed 50 characters')
        .optional(),
      avatarUrl: z
        .string()
        .url('Avatar URL must be a valid URL')
        .optional()
        .nullable(),
      email: emailSchema.optional(),
    }),
  }),

  // Email verification token validation
  verifyEmail: z.object({
    query: z.object({
      token: z.string().nonempty('Verification token is required'),
    }),
  }),
};