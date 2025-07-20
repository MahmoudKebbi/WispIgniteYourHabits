"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inventory = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Item_1 = require("./Item");
let Inventory = class Inventory {
    id;
    user;
    item;
    quantity;
    is_equipped;
    acquired_at;
    updated_at;
};
exports.Inventory = Inventory;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], Inventory.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.id, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    tslib_1.__metadata("design:type", User_1.User)
], Inventory.prototype, "user", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => Item_1.Item, (item) => item.id, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'item_id' }),
    tslib_1.__metadata("design:type", Item_1.Item)
], Inventory.prototype, "item", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 1 }),
    tslib_1.__metadata("design:type", Number)
], Inventory.prototype, "quantity", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    tslib_1.__metadata("design:type", Boolean)
], Inventory.prototype, "is_equipped", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp with time zone' }),
    tslib_1.__metadata("design:type", Date)
], Inventory.prototype, "acquired_at", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp with time zone' }),
    tslib_1.__metadata("design:type", Date)
], Inventory.prototype, "updated_at", void 0);
exports.Inventory = Inventory = tslib_1.__decorate([
    (0, typeorm_1.Entity)('inventories'),
    (0, typeorm_1.Unique)(['user', 'item'])
], Inventory);
//# sourceMappingURL=Inventory.js.map