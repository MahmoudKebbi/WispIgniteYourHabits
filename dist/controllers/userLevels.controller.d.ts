import { Request, Response } from 'express';
export declare class UserLevelController {
    static getLevel(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getXpProgress(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
