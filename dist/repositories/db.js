"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const User_1 = require("../models/User");
const Source_1 = require("../models/Source");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const Habit_1 = require("../models/Habit");
const FriendRequest_1 = require("../models/FriendRequest");
const HabitEvent_1 = require("../models/HabitEvent");
const Inventory_1 = require("../models/Inventory");
const XPTransaction_1 = require("../models/XPTransaction");
const UserLevel_1 = require("../models/UserLevel");
const Quest_1 = require("../models/Quest");
const Item_1 = require("../models/Item");
const CoinTransaction_1 = require("../models/CoinTransaction");
const Notification_1 = require("../models/Notification");
const UserVerification_1 = require("../models/UserVerification");
dotenv_1.default.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.WISP_DB_HOST,
    port: Number(process.env.WISP_DB_PORT),
    username: process.env.WISP_DB_ADMIN_USERNAME,
    password: process.env.WISP_DB_ADMIN_PASSWORD,
    database: process.env.WISP_DB_NAME,
    entities: [
        User_1.User,
        UserVerification_1.UserVerification,
        Source_1.Source,
        Habit_1.Habit,
        FriendRequest_1.FriendRequest,
        HabitEvent_1.HabitEvent,
        XPTransaction_1.XpTransaction,
        UserLevel_1.UserLevel,
        Quest_1.Quest,
        Item_1.Item,
        Inventory_1.Inventory,
        CoinTransaction_1.CoinTransaction,
        Notification_1.Notification,
    ],
    synchronize: true,
});
//# sourceMappingURL=db.js.map