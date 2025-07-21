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
const Friend_1 = require("../models/Friend");
const QuestProgress_1 = require("../models/QuestProgress");
dotenv_1.default.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.WISP_DB_HOST,
    port: Number(process.env.WISP_DB_PORT),
    username: process.env.WISP_DB_ADMIN_USERNAME,
    password: process.env.WISP_DB_ADMIN_PASSWORD,
    database: process.env.WISP_DB_NAME,
    entities: [
        CoinTransaction_1.CoinTransaction,
        Friend_1.Friend,
        FriendRequest_1.FriendRequest,
        Habit_1.Habit,
        HabitEvent_1.HabitEvent,
        Inventory_1.Inventory,
        Item_1.Item,
        Notification_1.Notification,
        Quest_1.Quest,
        QuestProgress_1.QuestProgress,
        Source_1.Source,
        User_1.User,
        UserLevel_1.UserLevel,
        UserVerification_1.UserVerification,
        XPTransaction_1.XpTransaction,
    ],
    synchronize: true,
});
//# sourceMappingURL=db.js.map