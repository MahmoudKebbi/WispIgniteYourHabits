"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HabitEvent = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Habit_1 = require("./Habit");
const Source_1 = require("./Source");
let HabitEvent = class HabitEvent {
    id;
    user;
    habit;
    source;
    completed_at;
    xp_earned;
    coin_earned;
    notes;
};
exports.HabitEvent = HabitEvent;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], HabitEvent.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.id, {
        onDelete: 'CASCADE',
        nullable: false,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    tslib_1.__metadata("design:type", User_1.User)
], HabitEvent.prototype, "user", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => Habit_1.Habit, (habit) => habit.id, {
        onDelete: 'CASCADE',
        nullable: false,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'habit_id' }),
    tslib_1.__metadata("design:type", Habit_1.Habit)
], HabitEvent.prototype, "habit", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => Source_1.Source, { nullable: true, onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'source_id' }),
    tslib_1.__metadata("design:type", Source_1.Source)
], HabitEvent.prototype, "source", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp with time zone',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    tslib_1.__metadata("design:type", Date)
], HabitEvent.prototype, "completed_at", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 10 }),
    tslib_1.__metadata("design:type", Number)
], HabitEvent.prototype, "xp_earned", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 5 }),
    tslib_1.__metadata("design:type", Number)
], HabitEvent.prototype, "coin_earned", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    tslib_1.__metadata("design:type", String)
], HabitEvent.prototype, "notes", void 0);
exports.HabitEvent = HabitEvent = tslib_1.__decorate([
    (0, typeorm_1.Entity)('habit_events')
], HabitEvent);
//# sourceMappingURL=HabitEvent.js.map