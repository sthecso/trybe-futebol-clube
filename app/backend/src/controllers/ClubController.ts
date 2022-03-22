import { Request, Response } from 'express';
import ClubService from '../services/ClubService';

const ClubController = async (_req: Request, res: Response) => {
  const allClubs = await ClubService.getAllClubs();

  res.status(200).json(allClubs);
};

const ClubControllerId = async (req: Request, res: Response) => {
  const { id } = req.params;
  const idNumber = Number(id);
  const clubById = await ClubService.getClubById(idNumber);

  res.status(200).json(clubById);
};

export { ClubController, ClubControllerId };
