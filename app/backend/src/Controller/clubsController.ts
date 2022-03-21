import { Router, Request, Response } from 'express';
import findAllClubs, { findOneClub } from '../Services/clubService';

const clubs = Router();

clubs.get('/', async (_req: Request, res: Response) => {
  const allClubs = await findAllClubs();

  res.status(200).json(allClubs);
});

clubs.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const clubId = Number(id);

  const club = await findOneClub(clubId);

  res.status(200).json(club);
});

export default clubs;
