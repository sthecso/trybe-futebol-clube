import { Request, Response, NextFunction } from 'express';
import { findOneClub } from '../../Services/clubService';

const validateTeams = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;

  if (homeTeam === awayTeam) {
    return res.status(400).json(
      { message: 'It is not possible to create a match with two equal teams' },
    );
  }
  next();
};

const checkTeam = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;

  const home = await findOneClub(homeTeam);
  const away = await findOneClub(awayTeam);

  if (!home || !away) {
    return res.status(400).json({ message: 'Team not found' });
  }
  next();
};

export default validateTeams;
export { checkTeam };
