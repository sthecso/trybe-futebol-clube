import { Request, Response } from 'express';
import { getClub, getClubId } from '../services/clubsService';

const getClubController = async (req: Request, res: Response) => {
  const result = await getClub();

  return res.status(200).json(result);
};

const geyClubIdController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await getClubId(id);

  return res.status(200).json(result);
};

export { getClubController, geyClubIdController };
