import { Request, Response } from 'express';
export declare class QuestController {
    static createQuest(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static deleteQuest(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getMyQuests(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getQuestById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static joinQuest(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static leaveQuest(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static completeQuest(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getFriendQuests(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
