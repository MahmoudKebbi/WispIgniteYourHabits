"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLevel = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
let UserLevel = class UserLevel {
    id;
    user;
    level;
    xp_total;
    xp_to_next;
    level_up_at;
    created_at;
    updated_at;
};
exports.UserLevel = UserLevel;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], UserLevel.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToOne)(() => User_1.User, { nullable: false, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    tslib_1.__metadata("design:type", User_1.User)
], UserLevel.prototype, "user", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 1 }),
    tslib_1.__metadata("design:type", Number)
], UserLevel.prototype, "level", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    tslib_1.__metadata("design:type", Number)
], UserLevel.prototype, "xp_total", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    tslib_1.__metadata("design:type", Number)
], UserLevel.prototype, "xp_to_next", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp with time zone', nullable: true }),
    tslib_1.__metadata("design:type", Date)
], UserLevel.prototype, "level_up_at", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp with time zone' }),
    tslib_1.__metadata("design:type", Date)
], UserLevel.prototype, "created_at", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp with time zone' }),
    tslib_1.__metadata("design:type", Date)
], UserLevel.prototype, "updated_at", void 0);
exports.UserLevel = UserLevel = tslib_1.__decorate([
    (0, typeorm_1.Entity)('user_levels'),
    (0, typeorm_1.Check)(`"xp_total" >= 0`),
    (0, typeorm_1.Check)(`"xp_to_next" >= 0`),
    (0, typeorm_1.Index)('IDX_USERLEVEL_USER', ['user']),
    (0, typeorm_1.Index)('IDX_USERLEVEL_LEVEL', ['level'])
], UserLevel);
//# sourceMappingURL=UserLevel.js.map