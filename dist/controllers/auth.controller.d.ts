import { Request, Response } from 'express';
export declare class AuthController {
    static signup(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static login(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static me(req: Request, res: Response): Promise<void>;
    static verifyEmail(req: Request, res: Response): Promise<void | Response<any, Record<string, any>>>;
    static resendVerificationEmail(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static forgotPassword(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static resetPassword(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static changePassword(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static updateProfile(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static deleteUser(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
