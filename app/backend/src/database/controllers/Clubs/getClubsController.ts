import { Request, Response } from 'express';
import getClubsService from '../../services/Clubs/getClubsService';

async function getClubsController(_req: Request, res: Response) {
  const clubs = await getClubsService();
  return res.status(200).json(clubs);
}

export default getClubsController;
