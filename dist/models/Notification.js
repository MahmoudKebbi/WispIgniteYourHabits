"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
let Notification = class Notification {
    id;
    user;
    type;
    message;
    is_read;
    reference_id;
    created_at;
};
exports.Notification = Notification;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], Notification.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.id, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    tslib_1.__metadata("design:type", User_1.User)
], Notification.prototype, "user", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['friend_request', 'quest_update', 'habit_reminder', 'system'],
    }),
    (0, typeorm_1.Index)(),
    tslib_1.__metadata("design:type", String)
], Notification.prototype, "type", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    tslib_1.__metadata("design:type", String)
], Notification.prototype, "message", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    tslib_1.__metadata("design:type", Boolean)
], Notification.prototype, "is_read", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true }),
    tslib_1.__metadata("design:type", String)
], Notification.prototype, "reference_id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp with time zone' }),
    tslib_1.__metadata("design:type", Date)
], Notification.prototype, "created_at", void 0);
exports.Notification = Notification = tslib_1.__decorate([
    (0, typeorm_1.Entity)('notifications')
], Notification);
//# sourceMappingURL=Notification.js.map