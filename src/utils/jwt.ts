import jwt, { SignOptions, Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET: Secret = process.env.JWT_SECRET || 'super-duper-secret-key-very-much-strong'; // use env var in production

export function generateToken(payload: object, expiresIn: string): string {
  console.log('Generating token using secret:', JWT_SECRET);
  const EXPIRES_IN = expiresIn || '1h'; // Default expiration time is 1 hour
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: EXPIRES_IN,
  } as SignOptions);
  return token;
}

export function verifyToken<T = any>(token: string): T {
  return jwt.verify(token, JWT_SECRET) as T;
}
