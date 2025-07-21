"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestProgress = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Quest_1 = require("./Quest");
let QuestProgress = class QuestProgress {
    id;
    user;
    quest;
    status;
    started_at;
    completed_at;
    created_at;
    updated_at;
};
exports.QuestProgress = QuestProgress;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], QuestProgress.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: false, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    tslib_1.__metadata("design:type", User_1.User)
], QuestProgress.prototype, "user", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => Quest_1.Quest, { nullable: false, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'quest_id' }),
    tslib_1.__metadata("design:type", Quest_1.Quest)
], QuestProgress.prototype, "quest", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['not_started', 'in_progress', 'completed', 'failed'],
        default: 'not_started',
    }),
    tslib_1.__metadata("design:type", String)
], QuestProgress.prototype, "status", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp with time zone', nullable: true }),
    tslib_1.__metadata("design:type", Date)
], QuestProgress.prototype, "started_at", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp with time zone', nullable: true }),
    tslib_1.__metadata("design:type", Date)
], QuestProgress.prototype, "completed_at", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp with time zone' }),
    tslib_1.__metadata("design:type", Date)
], QuestProgress.prototype, "created_at", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp with time zone' }),
    tslib_1.__metadata("design:type", Date)
], QuestProgress.prototype, "updated_at", void 0);
exports.QuestProgress = QuestProgress = tslib_1.__decorate([
    (0, typeorm_1.Entity)('quest_progress'),
    (0, typeorm_1.Index)('IDX_QUESTPROGRESS_USER', ['user']),
    (0, typeorm_1.Index)('IDX_QUESTPROGRESS_QUEST', ['quest']),
    (0, typeorm_1.Index)('IDX_QUESTPROGRESS_USER_QUEST', ['user', 'quest']),
    (0, typeorm_1.Index)('IDX_QUESTPROGRESS_STATUS', ['status'])
], QuestProgress);
//# sourceMappingURL=QuestProgress.js.map