import { DataSource } from 'typeorm';
import { User } from '../models/User';
import { Source } from '../models/Source';

import dotenv from 'dotenv';
import { Habit } from '../models/Habit';
import { FriendRequest } from '../models/FriendRequest';
import { HabitEvent } from '../models/HabitEvent';
import { Inventory } from '../models/Inventory';
import { XpTransaction } from '../models/XPTransaction';
import { UserLevel } from '../models/UserLevel';
import { Quest } from '../models/Quest';
import { Item } from '../models/Item';
import { CoinTransaction } from '../models/CoinTransaction';
import { Notification } from '../models/Notification';
import { UserVerification } from '../models/UserVerification';
import { Friend } from '../models/Friend';
import { QuestProgress } from '../models/QuestProgress';
dotenv.config();

export const AppDataSource = new DataSource({
   type: 'postgres',
   host: process.env.WISP_DB_HOST,
   port: Number(process.env.WISP_DB_PORT),
   username: process.env.WISP_DB_ADMIN_USERNAME,
   password: process.env.WISP_DB_ADMIN_PASSWORD,
   database: process.env.WISP_DB_NAME,
   entities: [
      CoinTransaction,
      Friend,
      FriendRequest,
      Habit,
      HabitEvent,
      Inventory,
      Item,
      Notification,
      Quest,
      QuestProgress,
      Source,
      User,
      UserLevel,
      UserVerification,
      XpTransaction,
   ],
   synchronize: true,
});
