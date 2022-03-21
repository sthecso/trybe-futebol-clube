import { NextFunction, Request, Response } from 'express';
import { ClubModel } from '../database/models';
import StatusCode from '../enums';
import { IMatch } from '../interfaces';

const validateMatch = (req: Request, res: Response, next: NextFunction) => {
  try {
    const match = req.body as IMatch;
    const { homeTeam, awayTeam } = match;
    if (homeTeam === awayTeam) {
      return res.status(StatusCode.BAD_REQUEST)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    if (!ClubModel.findByPk(homeTeam) || !ClubModel.findByPk(awayTeam)) {
      return res.status(StatusCode.BAD_REQUEST)
        .json({ message: 'Team not found' });
    }
    next();
  } catch (e) {
    next(e);
  }
};

export default validateMatch;
