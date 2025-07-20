"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const zod_1 = require("zod");
const validate = (schema) => async (req, res, next) => {
    try {
        await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        return next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            const formattedErrors = error.issues.map((err) => ({
                path: err.path.join('.'),
                message: err.message,
            }));
            return res.status(400).json({
                error: 'Validation failed',
                details: formattedErrors,
            });
        }
        return res.status(500).json({ error: 'Internal server error during validation' });
    }
};
exports.validate = validate;
//# sourceMappingURL=validate.js.map