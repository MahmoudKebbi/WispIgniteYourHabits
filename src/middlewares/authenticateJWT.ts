// middlewares/authenticateJWT.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend the Request interface to include the user property
declare global {
  namespace Express {
    interface Request {
      user?: string | object; // Adjust type as needed
    }
  }
}

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
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
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    console.log('Token successfully verified:', req.user);
    next();
  } catch {
    console.error('Token verification failed');
    return res.status(401).json({ message: 'Invalid token' });
  }
};
