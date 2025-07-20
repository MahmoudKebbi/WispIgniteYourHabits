import { Request, Response } from 'express';
export declare class HabitEventsController {
    static getHabitEventsByUser(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getAllHabitEvents(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getEventsByHabitId(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static filterHabitEvents(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static deleteHabitEvent(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
