import { Request, Response } from 'express';
import { XpTransactionService } from '../services/xpTx.service';
import { CoinTransactionService } from '../services/coinTx.service';

export class XpAndCoinController {
   static async getXpBalance(req: Request, res: Response) {
      try {
         const userId = (req.user as { id: string }).id;
         const balance = await XpTransactionService.getBalance(userId);
         res.json({ xp: balance });
      } catch (err: any) {
         res.status(400).json({ error: err.message || 'Could not fetch XP balance' });
      }
   }

   static async getCoinBalance(req: Request, res: Response) {
      try {
         const userId = (req.user as { id: string }).id;
         const balance = await CoinTransactionService.getBalance(userId);
         res.json({ coins: balance });
      } catch (err: any) {
         res.status(400).json({ error: err.message || 'Could not fetch coin balance' });
      }
   }

   static async getXpHistory(req: Request, res: Response) {
      try {
         const userId = (req.user as { id: string }).id;
         const { from, to } = req.query;
         const history = await XpTransactionService.getHistory(userId, {
            from: from ? new Date(from as string) : undefined,
            to: to ? new Date(to as string) : undefined,
         });
         res.json({ history });
      } catch (err: any) {
         res.status(400).json({ error: err.message || 'Could not fetch XP history' });
      }
   }

   static async getCoinHistory(req: Request, res: Response) {
      try {
         const userId = (req.user as { id: string }).id;
         const { from, to } = req.query;
         const history = await CoinTransactionService.getHistory(userId, {
            from: from ? new Date(from as string) : undefined,
            to: to ? new Date(to as string) : undefined,
         });
         res.json({ history });
      } catch (err: any) {
         res.status(400).json({ error: err.message || 'Could not fetch coin history' });
      }
   }

   static async getGamificationStats(req: Request, res: Response) {
      try {
         const userId = (req.user as { id: string }).id;
         const [xp, coins] = await Promise.all([
            XpTransactionService.getBalance(userId),
            CoinTransactionService.getBalance(userId),
         ]);
         res.json({ xp, coins });
      } catch (err: any) {
         res.status(400).json({ error: err.message || 'Could not fetch gamification stats' });
      }
   }
}
