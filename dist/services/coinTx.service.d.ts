import { CoinTransaction } from '../models/CoinTransaction';
export declare class CoinTransactionService {
    static getBalance(userId: string): Promise<number>;
    static getHistory(userId: string, filters?: {
        from?: Date;
        to?: Date;
    }): Promise<CoinTransaction[]>;
    static addCoins(userId: string, amount: number, reason: string, referenceId?: string): Promise<CoinTransaction>;
    static spendCoins(userId: string, amount: number, reason: string, referenceId?: string): Promise<CoinTransaction>;
}
