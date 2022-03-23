import { Request, Response, Router } from 'express';
import ControllerMatchPost from '../controller/postMatchController';
import GetAllMatchs from '../controller/getAllMatchContro';
import validateToken from '../controller/middlewares/validateToken';

const matchRoute = Router();

matchRoute.get('/matchs', async(req:Request, res: Response)=> {
  const result = await GetAllMatchs.getMatch();
  return res.status(200).json(result);
});

matchRoute.post('/matchs', validateToken, async (req:Request, res:Response) => {
  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;
  const data = { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress };
  const result = await ControllerMatchPost.createMatch(data);
  res.status(201).json(result);
});

export default matchRoute;
