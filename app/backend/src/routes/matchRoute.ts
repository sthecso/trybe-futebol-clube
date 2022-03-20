import { Request, Response, Router } from 'express';
import ControllerMatchPost from '../controller/postMatchController';
import validateToken from '../controller/middlewares/validateToken';

const matchRoute = Router();

matchRoute.post('/matchs', validateToken, async (req:Request, res:Response) => {
  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;
  const data = { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress };
  const result = await ControllerMatchPost.createMatch(data);
  res.status(200).json(result);
});

export default matchRoute;
