import { XpTransaction } from '../models/XPTransaction';
export declare class XpTransactionService {
    static getBalance(userId: string): Promise<number>;
    static getHistory(userId: string, filters?: {
        from?: Date;
        to?: Date;
    }): Promise<XpTransaction[]>;
    static addXP(userId: string, amount: number, reason: string, referenceId?: string): Promise<XpTransaction>;
    static spendXP(userId: string, amount: number, reason: string, referenceId?: string): Promise<XpTransaction>;
}
