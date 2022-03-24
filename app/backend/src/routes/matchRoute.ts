import { Request, Response, Router } from 'express';
import ControllerMatchPost from '../controller/postMatchController';
import GetAllMatchs from '../controller/getAllMatchControl';
import PatchMatchController from '../controller/patchMatchControl';
import PatchMatchController27 from '../controller/patchMatchControl27';
import validateToken from '../controller/middlewares/validateToken';

const matchRoute = Router();

matchRoute.get('/matchs', async (req:Request, res: Response) => {
  const { inProgress } = req.query;
  if (inProgress === undefined) {
    const result = await GetAllMatchs.getMatch();
    return res.status(200).json(result);
  }
  const bool = inProgress === 'true';
  if (bool === true) {
    const resultTrue = await GetAllMatchs.getMatchTrue();
    return res.status(200).json(resultTrue);
  }
  if (bool === false) {
    const resultFalse = await GetAllMatchs.getMatchFalse();
    return res.status(200).json(resultFalse);
  }
});

matchRoute.patch('/matchs/:id/finish', async (req:Request, res:Response) => {
  const { id } = req.params;
  const numberId = Number(id);
  const result = await PatchMatchController.patch(numberId);
  return res.status(200).json(result);
});

matchRoute.patch('/matchs/:id', async (req:Request, res:Response) => {
  const { id } = req.params;
  const numberId = Number(id);
  const { homeTeamGoals, awayTeamGoals } = req.body;
  const nHomeGoals = Number(homeTeamGoals);
  const nAwayGoals = Number(awayTeamGoals);
  if (homeTeamGoals === undefined) {
    const result = await PatchMatchController27.patchInProgres(numberId);
    return res.status(200).json(result);
  }

  const result = await PatchMatchController27.patch27Goal(numberId, nHomeGoals, nAwayGoals);
  return res.status(200).json(result);
});

matchRoute.post('/matchs', validateToken, async (req:Request, res:Response) => {
  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;
  const data = { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress };
  const result = await ControllerMatchPost.createMatch(data);
  res.status(201).json(result);
});

export default matchRoute;
