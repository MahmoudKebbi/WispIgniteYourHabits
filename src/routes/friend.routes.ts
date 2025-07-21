import { Router } from 'express';
import { FriendController } from '../controllers/friends.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.post('/friends', FriendController.sendRequest);
router.post('/friends/:id/respond', FriendController.respondToRequest);
router.get('/friends', FriendController.getFriends);
router.delete('/friends/:id', FriendController.removeFriend);
router.get('/friends/requests', FriendController.getPendingRequests);
router.get('/friends/sent-requests', FriendController.getSentRequests);
router.get('/friends/:id', FriendController.getFriendById);

export default router;
