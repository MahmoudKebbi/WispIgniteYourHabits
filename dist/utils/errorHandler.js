"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createError = createError;
function createError(message, statusCode = 400) {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
}
//# sourceMappingURL=errorHandler.js.map