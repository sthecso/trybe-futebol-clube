import { Request, Response } from 'express';
import getLeaderboardService from '../services/getLeaderboardService';

async function getLeaderboardController(req: Request, res: Response) {
  const leaderboard = await getLeaderboardService();
  return res.status(200).json(leaderboard);
}

export default getLeaderboardController;
