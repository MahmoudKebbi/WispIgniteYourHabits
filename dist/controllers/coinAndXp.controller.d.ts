import { Request, Response } from 'express';
export declare class XpAndCoinController {
    static getXpBalance(req: Request, res: Response): Promise<void>;
    static getCoinBalance(req: Request, res: Response): Promise<void>;
    static getXpHistory(req: Request, res: Response): Promise<void>;
    static getCoinHistory(req: Request, res: Response): Promise<void>;
    static getGamificationStats(req: Request, res: Response): Promise<void>;
}
