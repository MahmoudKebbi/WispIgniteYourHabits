import { Request, Response } from 'express';
export declare class HabitController {
    static createHabit(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getAllHabits(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getHabitById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static updateHabit(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static archiveHabit(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static unarchiveHabit(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static deleteHabit(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static checkInHabit(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getHabitsByFrequency(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getHabitsByCategory(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getArchivedHabits(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getHabitCount(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getArchivedHabitCount(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getHabitByName(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static searchHabits(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
