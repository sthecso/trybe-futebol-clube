import { Request, Response, Router } from 'express';
import GetAllClubs from '../controller/ClubController';

const clubRoute = Router();

clubRoute.get('/clubs', async (req:Request, res:Response) => {
  const result = await GetAllClubs.getClubs();
  res.status(200).json(result);
});

export default clubRoute;
