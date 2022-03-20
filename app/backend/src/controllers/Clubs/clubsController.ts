import { Response, NextFunction } from 'express';
import StatusCode from '../../enums';

import Club from '../../database/models/Club';
import { CustomRequest, ILogin } from '../../interfaces';

const EMPTY_DB = 'no club registered yet';
const CLUB_NOT_FOUND = 'club not found';

export default class ClubController {
  static async getAll(
    _req: CustomRequest<ILogin>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const clubs = await Club.findAll({ raw: true });
      if (!clubs) return res.status(StatusCode.NOT_FOUND).json({ message: EMPTY_DB });
      console.log(clubs);
      return res.status(StatusCode.OK).json(clubs);
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
      const { id } = req.params;
      const club = await Club.findOne({ where: { id }, raw: true });
      if (!club) return res.status(StatusCode.NOT_FOUND).json({ message: CLUB_NOT_FOUND });
      return res.status(StatusCode.OK).json(club);
    } catch (err) {
      next(err);
    }
  }
}
