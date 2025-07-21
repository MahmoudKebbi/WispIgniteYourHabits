"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendRequest = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
let FriendRequest = class FriendRequest {
    id;
    sender;
    receiver;
    status;
    created_at;
    updated_at;
};
exports.FriendRequest = FriendRequest;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], FriendRequest.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.id, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'sender_id' }),
    tslib_1.__metadata("design:type", User_1.User)
], FriendRequest.prototype, "sender", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.id, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'receiver_id' }),
    tslib_1.__metadata("design:type", User_1.User)
], FriendRequest.prototype, "receiver", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['pending', 'accepted', 'rejected', 'blocked'],
        default: 'pending',
    }),
    tslib_1.__metadata("design:type", String)
], FriendRequest.prototype, "status", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp with time zone' }),
    tslib_1.__metadata("design:type", Date)
], FriendRequest.prototype, "created_at", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp with time zone' }),
    tslib_1.__metadata("design:type", Date)
], FriendRequest.prototype, "updated_at", void 0);
exports.FriendRequest = FriendRequest = tslib_1.__decorate([
    (0, typeorm_1.Entity)('friend_requests'),
    (0, typeorm_1.Unique)(['sender', 'receiver']),
    (0, typeorm_1.Check)(`"sender_id" <> "receiver_id"`),
    (0, typeorm_1.Index)('IDX_FRIENDREQUEST_SENDER', ['sender']),
    (0, typeorm_1.Index)('IDX_FRIENDREQUEST_RECEIVER', ['receiver']),
    (0, typeorm_1.Index)('IDX_FRIENDREQUEST_SENDER_RECEIVER', ['sender', 'receiver'])
], FriendRequest);
//# sourceMappingURL=FriendRequest.js.map