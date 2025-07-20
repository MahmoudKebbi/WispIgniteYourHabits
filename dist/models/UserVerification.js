"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserVerification = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
let UserVerification = class UserVerification {
    id;
    user;
    token;
    type;
    expires_at;
    created_at;
};
exports.UserVerification = UserVerification;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], UserVerification.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.id, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    tslib_1.__metadata("design:type", User_1.User)
], UserVerification.prototype, "user", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    tslib_1.__metadata("design:type", String)
], UserVerification.prototype, "token", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['email_verification', 'password_reset'],
    }),
    tslib_1.__metadata("design:type", String)
], UserVerification.prototype, "type", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp with time zone' }),
    tslib_1.__metadata("design:type", Date)
], UserVerification.prototype, "expires_at", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp with time zone' }),
    tslib_1.__metadata("design:type", Date)
], UserVerification.prototype, "created_at", void 0);
exports.UserVerification = UserVerification = tslib_1.__decorate([
    (0, typeorm_1.Entity)('user_verifications')
], UserVerification);
//# sourceMappingURL=UserVerification.js.map