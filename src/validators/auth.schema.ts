import { z } from 'zod';


const emailSchema = z.string().nonempty('Email is required').email('Invalid email format');


const passwordSchema = z
  .string()
  .nonempty('Password is required')
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

export const authSchema = {
  
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

  
  login: z.object({
    body: z.object({
      email: emailSchema,
      password: z.string().nonempty('Password is required'),
    }),
  }),

  
  resendVerificationEmail: z.object({
    body: z.object({
      email: emailSchema,
    }),
  }),

  
  forgotPassword: z.object({
    body: z.object({
      email: emailSchema,
    }),
  }),

  
  resetPassword: z.object({
    body: z.object({
      token: z.string().nonempty('Token is required'),
      newPassword: passwordSchema,
    }),
  }),

  
  changePassword: z.object({
    body: z.object({
      currentPassword: z.string().nonempty('Current password is required'),
      newPassword: passwordSchema,
    }),
  }),

  
  updateProfile: z.object({
    body: z.object({
      displayName: z
        .string()
        .min(2, 'Display name must be at least 2 characters')
        .max(50, 'Display name cannot exceed 50 characters')
        .optional(),
      avatarUrl: z.string().url('Avatar URL must be a valid URL').optional().nullable(),
      email: emailSchema.optional(),
    }),
  }),

  
  verifyEmail: z.object({
    query: z.object({
      token: z.string().nonempty('Verification token is required'),
    }),
  }),
};
