"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
exports.verifyToken = verifyToken;
const tslib_1 = require("tslib");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET || 'super-duper-secret-key-very-much-strong';
function generateToken(payload, expiresIn) {
    console.log('Generating token using secret:', JWT_SECRET);
    const EXPIRES_IN = expiresIn || '1h';
    const token = jsonwebtoken_1.default.sign(payload, JWT_SECRET, {
        expiresIn: EXPIRES_IN,
    });
    return token;
}
function verifyToken(token) {
    return jsonwebtoken_1.default.verify(token, JWT_SECRET);
}
//# sourceMappingURL=jwt.js.map