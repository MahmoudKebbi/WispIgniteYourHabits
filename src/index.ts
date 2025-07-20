import 'reflect-metadata';
import dotenv from 'dotenv';
import app from './app';
import { AppDataSource } from './repositories/db';

dotenv.config();

const PORT = process.env.PORT || 4040;

AppDataSource.initialize()
  .then(() => {
    console.log('📦 Connected to database');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Failed to connect to DB:', error);
  });
