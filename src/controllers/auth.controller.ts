import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../repositories/db';
import { User } from '../models/User';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const repo = AppDataSource.getRepository(User);
  const user = await repo.findOneBy({ email });

  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: '1h' }
  );

  res.json({ token });
};

// authController.ts
export const me = async (req: Request, res: Response) => {
  res.json(req.user); // `req.user` comes from middleware
};

