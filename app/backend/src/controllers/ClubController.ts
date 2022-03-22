import { Request, Response } from 'express';
import Status from '../Enums/statusCode';
import Club from '../database/models/Club';

class ClubController {
  static async all(req: Request, res: Response) {
    const clubs = await Club.findAll();
    return res.status(Status.OK).json(clubs);
  }

  static async club(req: Request, res: Response) {
    const { id } = req.params;
    const club = await Club.findByPk(id);
    return res.status(Status.OK).json(club);
  }
}

export default ClubController;
