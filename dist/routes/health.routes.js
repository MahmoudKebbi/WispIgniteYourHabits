"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../repositories/db");
const router = (0, express_1.Router)();
router.get('/health', async (req, res) => {
    const isConnected = db_1.AppDataSource.isInitialized;
    if (isConnected) {
        console.log('Database is connected');
        return res.status(200).json({ status: 'ok' });
    }
    else {
        console.error('Database is not connected');
        return res.status(500).json({ status: 'database not connected' });
    }
});
exports.default = router;
//# sourceMappingURL=health.routes.js.map