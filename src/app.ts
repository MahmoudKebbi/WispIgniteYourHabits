import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './routes/auth.routes';
import healthRoutes from './routes/health.routes';
import habitRoutes from './routes/habits.routes';
import coinxpRoutes from './routes/coinXp.routes';
import userLevelRoutes from './routes/userLevel.routes';
import FriendRoutes from './routes/friend.routes';
import QuestRoutes from './routes/quest.routes';
import NotificatioRoutes from './routes/notification.routes';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

console.log('🚀 Middleware initialized');

console.log('Mounting routes...');
app.use('/api', healthRoutes);
console.log('Health routes mounted on /api');

app.use('/api/auth', authRoutes);
console.log('Auth routes mounted on /api/auth');

app.use('/api/habits', habitRoutes);
console.log('Habit routes mounted on /api/habits');

app.use('/api/wallet', coinxpRoutes);
console.log('Coin and XP routes mounted on /api/wallet');

app.use('/api/user-level', userLevelRoutes);
console.log('User level routes mounted on /api/user-level');

app.use('/api/friends', FriendRoutes);
console.log('Friend routes mounted on /api/friends');

app.use('/api/quests', QuestRoutes);
console.log('Quest routes mounted on /api/quests');

app.use('/api/notifications', NotificatioRoutes);
console.log('Notification routes mounted on /api/notifications');

app.use((_, res) => res.status(404).json({ message: 'Not found' }));

export default app;
