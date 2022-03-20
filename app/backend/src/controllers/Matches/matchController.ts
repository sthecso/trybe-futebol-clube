import { Response, NextFunction } from 'express';

import StatusCode from '../../enums';
import Match from '../../database/models/Matchs';
import Club from '../../database/models/Club';
import { CustomRequest, ILogin } from '../../interfaces';

const EMPTY_DB = 'no match registered yet';
const MATCH_NOT_FOUND = 'match not found';

export default class MatchController {
  static async getAll(
    _req: CustomRequest<ILogin>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      console.log('a');
      const matches = await Match.findAll({
        include: [
          { model: Club, as: 'homeClub', attributes: ['clubName'] },
          { model: Club, as: 'awayClub', attributes: ['clubName'] },
        ],
      });
      if (!matches) return res.status(StatusCode.NOT_FOUND).json({ message: EMPTY_DB });
      return res.status(StatusCode.OK).json(matches);
    } catch (err) {
      next(err);
    }
  }

  static async getById(
    req: CustomRequest<string>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { inProgress } = req.query;
      const matches = await Match.findAll({ where: { inProgress } });
      if (!matches) return res.status(StatusCode.NOT_FOUND).json({ message: MATCH_NOT_FOUND });
      return res.status(StatusCode.OK).json(matches);
    } catch (err) {
      next(err);
    }
  }
}
