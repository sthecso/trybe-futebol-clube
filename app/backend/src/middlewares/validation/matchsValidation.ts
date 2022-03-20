import { Request, Response, NextFunction } from 'express';
import tokenValidation from './tokenValidation';
import throwError from '../../service/error';
import { findClubById } from '../../service/matchs';

const clubsNotSameValidation = (req: Request, _res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;
  if (homeTeam === awayTeam) {
    return throwError('It is not possible to create a match with two equal teams', '401');
  }

  next();
};

const verifyIfClubsExists = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;
  const team1 = await findClubById(homeTeam);
  const team2 = await findClubById(awayTeam);
  if (team1 === null || team2 === null) {
    return res.status(401).json({ message: 'There is no team with such id!' });
  }

  next();
};

export default [
  tokenValidation,
  clubsNotSameValidation,
  verifyIfClubsExists,
];
