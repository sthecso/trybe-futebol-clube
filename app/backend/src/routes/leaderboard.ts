import { Router } from 'express';
import { LeaderboardController } from '../controllers';

const leaderboard = Router();

leaderboard.get(
  '/home',
  LeaderboardController,
);

export default leaderboard;
