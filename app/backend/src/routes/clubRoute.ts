import { Request, Response, Router } from 'express';
import GetAllClubs from '../controller/ClubController';
import GetOneClub from '../controller/ClubByIdController';

const clubRoute = Router();

clubRoute.get('/clubs', async (req:Request, res:Response) => {
  const result = await GetAllClubs.getClubs();
  res.status(200).json(result);
});

clubRoute.get('/clubs/:id', async (req:Request, res: Response) => {
  const { id } = req.params;
  const NumberId = Number(id);
  const result = await GetOneClub.getOneClub(NumberId);
  res.status(200).json(result);
});

export default clubRoute;
