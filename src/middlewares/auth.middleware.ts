// middlewares/authenticateJWT.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// Extend the Request interface to include the user property
declare global {
  namespace Express {
    interface Request {
      user?: string | object; // Adjust type as needed
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log('Authenticating JWT...');
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    console.error('Missing or invalid token format');
    return res.status(401).json({ message: 'Missing or invalid token' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    console.error('Token not provided');
    return res.status(401).json({ message: 'Token not provided' });
  }

  try {
    console.log('Verifying token:', token);
    console.log('Using secret:', process.env.JWT_SECRET);
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    console.log('Token successfully verified:', req.user);
    return next();
  } catch {
    console.error('Token verification failed');
    return res.status(401).json({ message: 'Invalid token' });
  }
};
