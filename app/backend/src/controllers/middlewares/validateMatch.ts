import { NextFunction, Request, Response } from 'express';
import { getById } from '../../services/clubService';

const verifyBody = (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;
  const message = { message: 'It is not possible to create a match with two equal teams' };

  if (homeTeam === awayTeam) return res.status(401).json(message);

  next();
};

const verifyExistsClubs = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;
  const message = { message: 'There is no team with such id!' };
  const home = await getById(homeTeam);
  const away = await getById(awayTeam);

  if (!home || !away) return res.status(401).json(message);

  next();
};

export {
  verifyBody,
  verifyExistsClubs,
};
