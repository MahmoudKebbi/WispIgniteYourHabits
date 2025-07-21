import { Request, Response } from 'express';
export declare class NotificationController {
    static getNotifications(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static markAsRead(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static markAllAsRead(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
