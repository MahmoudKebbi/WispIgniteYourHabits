"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Source = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const User_1 = require("./User");
let Source = class Source {
    id;
    name;
    type;
    api_key;
    created_by;
    created_at;
    updated_at;
    generateApiKey() {
        this.api_key = (0, uuid_1.v4)();
    }
};
exports.Source = Source;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], Source.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    tslib_1.__metadata("design:type", String)
], Source.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['web', 'mobile', 'iot', 'backend', 'internal', 'other'],
    }),
    tslib_1.__metadata("design:type", String)
], Source.prototype, "type", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', unique: true }),
    (0, typeorm_1.Index)({ unique: true }),
    tslib_1.__metadata("design:type", String)
], Source.prototype, "api_key", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true, onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'created_by_id' }),
    tslib_1.__metadata("design:type", User_1.User)
], Source.prototype, "created_by", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp with time zone' }),
    tslib_1.__metadata("design:type", Date)
], Source.prototype, "created_at", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp with time zone' }),
    tslib_1.__metadata("design:type", Date)
], Source.prototype, "updated_at", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], Source.prototype, "generateApiKey", null);
exports.Source = Source = tslib_1.__decorate([
    (0, typeorm_1.Entity)('sources')
], Source);
//# sourceMappingURL=Source.js.map