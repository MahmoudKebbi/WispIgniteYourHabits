export declare function generateToken(payload: object, expiresIn: string): string;
export declare function verifyToken<T = any>(token: string): T;
