"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XpTransaction = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
let XpTransaction = class XpTransaction {
    id;
    user;
    amount;
    reason;
    reference_id;
    created_at;
};
exports.XpTransaction = XpTransaction;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], XpTransaction.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.id, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    tslib_1.__metadata("design:type", User_1.User)
], XpTransaction.prototype, "user", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    tslib_1.__metadata("design:type", Number)
], XpTransaction.prototype, "amount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    tslib_1.__metadata("design:type", String)
], XpTransaction.prototype, "reason", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true }),
    tslib_1.__metadata("design:type", String)
], XpTransaction.prototype, "reference_id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp with time zone' }),
    tslib_1.__metadata("design:type", Date)
], XpTransaction.prototype, "created_at", void 0);
exports.XpTransaction = XpTransaction = tslib_1.__decorate([
    (0, typeorm_1.Entity)('xp_transactions')
], XpTransaction);
//# sourceMappingURL=XPTransaction.js.map