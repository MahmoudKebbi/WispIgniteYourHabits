import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './routes/auth.routes';
import healthRoutes from './routes/health.routes';
import habitRoutes from './routes/habits.routes';
import coinxpRoutes from './routes/coinXp.routes';

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


app.use((_, res) => res.status(404).json({ message: 'Not found' }));

export default app;
