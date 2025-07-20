"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const app_1 = tslib_1.__importDefault(require("./app"));
const db_1 = require("./repositories/db");
dotenv_1.default.config();
const PORT = process.env.PORT || 4040;
db_1.AppDataSource.initialize()
    .then(() => {
    console.log('📦 Connected to database');
    app_1.default.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
})
    .catch((error) => {
    console.error('❌ Failed to connect to DB:', error);
});
//# sourceMappingURL=index.js.map