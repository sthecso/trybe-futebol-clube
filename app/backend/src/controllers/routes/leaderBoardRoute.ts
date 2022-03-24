import { Router } from 'express';

import LeaderboardController from '../LeaderBoard';

const LeaderboardRouter = Router({ mergeParams: true });

LeaderboardRouter.get(
  '/home',
  LeaderboardController.getHomeTeamsLeaderBoard,
);

LeaderboardRouter.get(
  '/away',
  LeaderboardController.getHomeAwayLeaderBoard,
);

export default LeaderboardRouter;
