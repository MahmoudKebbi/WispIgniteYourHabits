// src/app.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './routes/auth.route';
import healthRoutes from './routes/health.route';



const app = express();

// === Basic Middleware ===
app.use(cors());
app.use(helmet());
app.use(express.json());


console.log('🚀 Middleware initialized')



// === Routes ===;

app.use('/api', healthRoutes);

app.use('/api/auth', authRoutes);

// === Fallback ===
app.use((_, res) => res.status(404).json({ message: 'Not found' }));

export default app;
