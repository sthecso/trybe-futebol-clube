import { Request, Response } from 'express';
import getClubByIdService from '../../services/Clubs/getClubById';

async function getClubByIdController(req: Request, res: Response) {
  const { id } = req.params;
  const club = await getClubByIdService(id);
  return res.status(200).json(club);
}

export default getClubByIdController;
