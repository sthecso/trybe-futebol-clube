import { NextFunction, Request, Response } from 'express';
import { ClubModel } from '../database/models';
import StatusCode from '../enums';
import { IMatch } from '../interfaces';

const validateMatch = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const match = req.body as IMatch;
    const { homeTeam, awayTeam } = match;
    if (homeTeam === awayTeam) {
      return res.status(StatusCode.UNAUTHORIZED)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    const homeTeamSearched = await ClubModel.findByPk(homeTeam);
    const awayTeamSearched = await ClubModel.findByPk(awayTeam);
    if (!homeTeamSearched || !awayTeamSearched) {
      return res.status(StatusCode.UNAUTHORIZED)
        .json({ message: 'There is no team with such id!' });
    }
    next();
  } catch (e) {
    next(e);
  }
};

export default validateMatch;
