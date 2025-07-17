import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authenticateJWT } from '../middlewares/authenticateJWT';

const router = Router();


router.post('/login', AuthController.login);
router.post('/signup', AuthController.signup);
router.get('/me', authenticateJWT, AuthController.me);
router.get('/verify-email', AuthController.verifyEmail);
router.post('/resend-verification-email', AuthController.resendVerificationEmail);
router.post('/forgot-password', AuthController.forgotPassword);
router.post('/reset-password', AuthController.resetPassword);
router.post('/change-password', authenticateJWT, AuthController.changePassword);
router.patch('/update-profile', authenticateJWT, AuthController.updateProfile);
router.delete('/delete-user', authenticateJWT, AuthController.deleteUser);

console.log('Auth routes initialized.');

export default router;
