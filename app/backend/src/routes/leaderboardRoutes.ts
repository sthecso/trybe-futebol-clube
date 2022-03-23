import { Router } from 'express';
import leaderboardController from '../controllers/leaderboardController';

const leaderboardRoutes = Router();

leaderboardRoutes.get('/leaderboard/home', leaderboardController.getAll);

export default leaderboardRoutes;
