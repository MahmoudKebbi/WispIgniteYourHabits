"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quest = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
let Quest = class Quest {
    id;
    creator;
    title;
    description;
    xp_reward;
    coin_reward;
    start_date;
    end_date;
    status;
    is_friend_quest;
    participants;
    created_at;
    updated_at;
};
exports.Quest = Quest;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], Quest.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.id, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'creator_id' }),
    tslib_1.__metadata("design:type", User_1.User)
], Quest.prototype, "creator", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ length: 150 }),
    tslib_1.__metadata("design:type", String)
], Quest.prototype, "title", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    tslib_1.__metadata("design:type", String)
], Quest.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    tslib_1.__metadata("design:type", Number)
], Quest.prototype, "xp_reward", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    tslib_1.__metadata("design:type", Number)
], Quest.prototype, "coin_reward", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp with time zone', nullable: true }),
    tslib_1.__metadata("design:type", Date)
], Quest.prototype, "start_date", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp with time zone', nullable: true }),
    tslib_1.__metadata("design:type", Date)
], Quest.prototype, "end_date", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['open', 'in_progress', 'completed', 'failed'],
        default: 'open',
    }),
    tslib_1.__metadata("design:type", String)
], Quest.prototype, "status", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: false }),
    tslib_1.__metadata("design:type", Boolean)
], Quest.prototype, "is_friend_quest", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToMany)(() => User_1.User, (user) => user.id),
    (0, typeorm_1.JoinTable)({
        name: 'quest_participants',
        joinColumn: { name: 'quest_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
    }),
    tslib_1.__metadata("design:type", Array)
], Quest.prototype, "participants", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp with time zone' }),
    tslib_1.__metadata("design:type", Date)
], Quest.prototype, "created_at", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp with time zone' }),
    tslib_1.__metadata("design:type", Date)
], Quest.prototype, "updated_at", void 0);
exports.Quest = Quest = tslib_1.__decorate([
    (0, typeorm_1.Entity)('quests'),
    (0, typeorm_1.Index)('IDX_QUEST_CREATOR', ['creator']),
    (0, typeorm_1.Index)('IDX_QUEST_STATUS', ['status']),
    (0, typeorm_1.Index)('IDX_QUEST_IS_FRIEND_QUEST', ['is_friend_quest'])
], Quest);
//# sourceMappingURL=Quest.js.map