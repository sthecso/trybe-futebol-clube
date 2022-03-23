import { Router } from 'express';
// import auth from '../middlewares';
import { LeaderboardController } from '../controllers';

const leaderboard = Router();

leaderboard.get(
  '/home',
  LeaderboardController,
);

export default leaderboard;
