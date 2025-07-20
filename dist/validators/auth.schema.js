"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authSchema = void 0;
const zod_1 = require("zod");
const emailSchema = zod_1.z.string().nonempty('Email is required').email('Invalid email format');
const passwordSchema = zod_1.z
    .string()
    .nonempty('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number');
exports.authSchema = {
    signup: zod_1.z.object({
        body: zod_1.z.object({
            email: emailSchema,
            password: passwordSchema,
            displayName: zod_1.z
                .string()
                .nonempty('Display name is required')
                .min(2, 'Display name must be at least 2 characters')
                .max(50, 'Display name cannot exceed 50 characters'),
        }),
    }),
    login: zod_1.z.object({
        body: zod_1.z.object({
            email: emailSchema,
            password: zod_1.z.string().nonempty('Password is required'),
        }),
    }),
    resendVerificationEmail: zod_1.z.object({
        body: zod_1.z.object({
            email: emailSchema,
        }),
    }),
    forgotPassword: zod_1.z.object({
        body: zod_1.z.object({
            email: emailSchema,
        }),
    }),
    resetPassword: zod_1.z.object({
        body: zod_1.z.object({
            token: zod_1.z.string().nonempty('Token is required'),
            newPassword: passwordSchema,
        }),
    }),
    changePassword: zod_1.z.object({
        body: zod_1.z.object({
            currentPassword: zod_1.z.string().nonempty('Current password is required'),
            newPassword: passwordSchema,
        }),
    }),
    updateProfile: zod_1.z.object({
        body: zod_1.z.object({
            displayName: zod_1.z
                .string()
                .min(2, 'Display name must be at least 2 characters')
                .max(50, 'Display name cannot exceed 50 characters')
                .optional(),
            avatarUrl: zod_1.z.string().url('Avatar URL must be a valid URL').optional().nullable(),
            email: emailSchema.optional(),
        }),
    }),
    verifyEmail: zod_1.z.object({
        query: zod_1.z.object({
            token: zod_1.z.string().nonempty('Verification token is required'),
        }),
    }),
};
//# sourceMappingURL=auth.schema.js.map