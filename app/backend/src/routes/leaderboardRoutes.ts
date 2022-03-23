import { Router } from 'express';
import leaderboardController from '../controllers/leaderboardController';

const leaderboardRoutes = Router();

leaderboardRoutes.get('/leaderboard/home', leaderboardController.getAllHome);
leaderboardRoutes.get('/leaderboard/away', leaderboardController.getAllAway);
leaderboardRoutes.get('/leaderboard/', leaderboardController.getAll);

export default leaderboardRoutes;
