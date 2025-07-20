"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Habit = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
let Habit = class Habit {
    id;
    user;
    name;
    description;
    frequency;
    goal_per_period;
    difficulty;
    category;
    xp_reward;
    coin_reward;
    is_archived;
    days_of_week;
    created_at;
    updated_at;
};
exports.Habit = Habit;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], Habit.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.id, {
        onDelete: 'CASCADE',
        nullable: false,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    tslib_1.__metadata("design:type", User_1.User)
], Habit.prototype, "user", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    tslib_1.__metadata("design:type", String)
], Habit.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    tslib_1.__metadata("design:type", String)
], Habit.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['daily', 'weekly', 'custom'],
        default: 'daily',
    }),
    tslib_1.__metadata("design:type", String)
], Habit.prototype, "frequency", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    tslib_1.__metadata("design:type", Number)
], Habit.prototype, "goal_per_period", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['very_easy', 'easy', 'medium', 'hard', 'epic'],
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], Habit.prototype, "difficulty", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['health', 'productivity', 'self_care', 'chores', 'creativity'],
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], Habit.prototype, "category", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    tslib_1.__metadata("design:type", Number)
], Habit.prototype, "xp_reward", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    tslib_1.__metadata("design:type", Number)
], Habit.prototype, "coin_reward", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: false }),
    tslib_1.__metadata("design:type", Boolean)
], Habit.prototype, "is_archived", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'int', array: true, nullable: true }),
    tslib_1.__metadata("design:type", Array)
], Habit.prototype, "days_of_week", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp with time zone' }),
    tslib_1.__metadata("design:type", Date)
], Habit.prototype, "created_at", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp with time zone' }),
    tslib_1.__metadata("design:type", Date)
], Habit.prototype, "updated_at", void 0);
exports.Habit = Habit = tslib_1.__decorate([
    (0, typeorm_1.Entity)('habits'),
    (0, typeorm_1.Check)(`"goal_per_period" >= 1`),
    (0, typeorm_1.Check)(`difficulty IS NULL OR difficulty IN ('very_easy', 'easy', 'medium', 'hard', 'epic')`),
    (0, typeorm_1.Check)(`category IS NULL OR category IN ('health', 'productivity', 'self_care', 'chores', 'creativity')`)
], Habit);
//# sourceMappingURL=Habit.js.map