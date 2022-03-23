import * as express from 'express';
import leaderboardServices from '../services/leaderboardService';

const leaderboardController = {
  getAll: async (_req: express.Request, res: express.Response) => {
    const leaderboard = await leaderboardServices.getAllHome();

    res.status(200).json(leaderboard);
  },
};

export default leaderboardController;
