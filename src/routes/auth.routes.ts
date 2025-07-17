import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authenticateJWT } from '../middlewares/authenticateJWT';
import { validate } from '../middlewares/validate';
import { authSchema } from '../validators/auth.schema';

const router = Router();

// Public routes
router.post('/login', validate(authSchema.login), AuthController.login);
router.post('/signup', validate(authSchema.signup), AuthController.signup);
router.get('/verify-email', validate(authSchema.verifyEmail), AuthController.verifyEmail);
router.post('/resend-verification-email', validate(authSchema.resendVerificationEmail), AuthController.resendVerificationEmail);
router.post('/forgot-password', validate(authSchema.forgotPassword), AuthController.forgotPassword);
router.post('/reset-password', validate(authSchema.resetPassword), AuthController.resetPassword);

// Protected routes
router.get('/me', authenticateJWT, AuthController.me);
router.post('/change-password', authenticateJWT, validate(authSchema.changePassword), AuthController.changePassword);
router.patch('/update-profile', authenticateJWT, validate(authSchema.updateProfile), AuthController.updateProfile);
router.delete('/delete-user', authenticateJWT, AuthController.deleteUser);

console.log('Auth routes initialized with validation.');

export default router;
