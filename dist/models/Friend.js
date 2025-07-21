"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Friend = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
let Friend = class Friend {
    id;
    user1;
    user2;
    created_at;
};
exports.Friend = Friend;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], Friend.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: false, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user1_id' }),
    tslib_1.__metadata("design:type", User_1.User)
], Friend.prototype, "user1", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: false, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user2_id' }),
    tslib_1.__metadata("design:type", User_1.User)
], Friend.prototype, "user2", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp with time zone' }),
    tslib_1.__metadata("design:type", Date)
], Friend.prototype, "created_at", void 0);
exports.Friend = Friend = tslib_1.__decorate([
    (0, typeorm_1.Entity)('friends'),
    (0, typeorm_1.Unique)(['user1', 'user2']),
    (0, typeorm_1.Check)(`"user1_id" <> "user2_id"`),
    (0, typeorm_1.Index)('IDX_FRIEND_USER1', ['user1']),
    (0, typeorm_1.Index)('IDX_FRIEND_USER2', ['user2']),
    (0, typeorm_1.Index)('IDX_FRIEND_USER1_USER2', ['user1', 'user2'])
], Friend);
//# sourceMappingURL=Friend.js.map