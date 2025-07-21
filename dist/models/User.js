"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const bcrypt = tslib_1.__importStar(require("bcrypt"));
let User = class User {
    id;
    email;
    password_hash;
    display_name;
    avatar_url;
    role;
    email_verified;
    email_verification_token;
    is_active;
    deleted_at;
    last_login_at;
    last_login_ip;
    created_at;
    updated_at;
    // ✨ Normalize email before saving
    normalizeEmail() {
        if (this.email) {
            this.email = this.email.trim().toLowerCase();
        }
    }
    // 🔍 Compare plain password for login
    async comparePassword(plain) {
        return bcrypt.compare(plain, this.password_hash);
    }
};
exports.User = User;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "email", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    (0, class_transformer_1.Exclude)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "password_hash", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'display_name', length: 50 }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "display_name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "avatar_url", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['user', 'admin'],
        default: 'user',
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "role", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: false }),
    tslib_1.__metadata("design:type", Boolean)
], User.prototype, "email_verified", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "email_verification_token", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: true }),
    tslib_1.__metadata("design:type", Boolean)
], User.prototype, "is_active", void 0);
tslib_1.__decorate([
    (0, typeorm_1.DeleteDateColumn)({ nullable: true }),
    tslib_1.__metadata("design:type", Date)
], User.prototype, "deleted_at", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp with time zone', nullable: true }),
    tslib_1.__metadata("design:type", Date)
], User.prototype, "last_login_at", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "last_login_ip", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp with time zone' }),
    tslib_1.__metadata("design:type", Date)
], User.prototype, "created_at", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp with time zone' }),
    tslib_1.__metadata("design:type", Date)
], User.prototype, "updated_at", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], User.prototype, "normalizeEmail", null);
exports.User = User = tslib_1.__decorate([
    (0, typeorm_1.Entity)('users'),
    (0, typeorm_1.Index)('IDX_USER_EMAIL', ['email'], { unique: true }),
    (0, typeorm_1.Index)('IDX_USER_IS_ACTIVE', ['is_active'])
], User);
//# sourceMappingURL=User.js.map