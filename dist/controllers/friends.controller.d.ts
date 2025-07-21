import { Request, Response } from 'express';
export declare class FriendController {
    static sendRequest(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static respondToRequest(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getFriends(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static removeFriend(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getPendingRequests(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getSentRequests(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getFriendById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
