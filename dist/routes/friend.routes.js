"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const friends_controller_1 = require("../controllers/friends.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authMiddleware);
router.post('/friends', friends_controller_1.FriendController.sendRequest);
router.post('/friends/:id/respond', friends_controller_1.FriendController.respondToRequest);
router.get('/friends', friends_controller_1.FriendController.getFriends);
router.delete('/friends/:id', friends_controller_1.FriendController.removeFriend);
router.get('/friends/requests', friends_controller_1.FriendController.getPendingRequests);
router.get('/friends/sent-requests', friends_controller_1.FriendController.getSentRequests);
router.get('/friends/:id', friends_controller_1.FriendController.getFriendById);
exports.default = router;
//# sourceMappingURL=friend.routes.js.map