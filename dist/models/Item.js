"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
let Item = class Item {
    id;
    name;
    description;
    type;
    rarity;
    effect;
    created_at;
    updated_at;
};
exports.Item = Item;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], Item.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    tslib_1.__metadata("design:type", String)
], Item.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    tslib_1.__metadata("design:type", String)
], Item.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['consumable', 'equipment', 'badge', 'currency'],
    }),
    tslib_1.__metadata("design:type", String)
], Item.prototype, "type", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['common', 'uncommon', 'rare', 'epic', 'legendary'],
    }),
    tslib_1.__metadata("design:type", String)
], Item.prototype, "rarity", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    tslib_1.__metadata("design:type", String)
], Item.prototype, "effect", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp with time zone' }),
    tslib_1.__metadata("design:type", Date)
], Item.prototype, "created_at", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp with time zone' }),
    tslib_1.__metadata("design:type", Date)
], Item.prototype, "updated_at", void 0);
exports.Item = Item = tslib_1.__decorate([
    (0, typeorm_1.Entity)('items'),
    (0, typeorm_1.Unique)(['name'])
], Item);
//# sourceMappingURL=Item.js.map