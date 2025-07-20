import { Request, Response, NextFunction } from 'express';
import { ZodObject, ZodRawShape } from 'zod';
export declare const validate: (schema: ZodObject<ZodRawShape>) => (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
