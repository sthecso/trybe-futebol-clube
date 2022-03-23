import { Request, Response, Router } from 'express';
import { LeaderboardControllerFactory } from '../factories';

const leaderboardRoute = Router();
const leaderboardController = LeaderboardControllerFactory();

leaderboardRoute.get(
  '/home',
  async (req: Request, res: Response): Promise<Response> => {
    const result = await leaderboardController.getAllHome();

    return res.status(200).json(result);
  },
);

export default leaderboardRoute;
