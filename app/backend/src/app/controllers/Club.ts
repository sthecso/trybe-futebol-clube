import { Request, Response } from 'express';
import StatusCode from '../utils/statusCode';
import { clubService } from '../services/Club';

export default class ClubController {
  static async getAll(_req: Request, res: Response) {
    const clubs = await clubService.getAll();

    return res.status(StatusCode.OK).json(clubs);
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    const club = await clubService.getById(+id);

    if (club) return res.status(StatusCode.OK).json(club);

    return res
      .status(StatusCode.NOT_FOUND)
      .json({ message: 'Club does not exist' });
  }
}

export const clubController = ClubController;
