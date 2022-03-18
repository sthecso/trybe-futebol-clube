import { Request, Response } from 'express';
import Club from '../database/models/Club';

export default class ClubsController {
  static async all(req: Request, res: Response) {
    const clubs = await Club.findAll();
    return res.status(200).json(clubs);
  }

  static async club(req: Request, res: Response) {
    const { id } = req.params;
    const club = await Club.findByPk(id);

    // if (!club) res.status(204).json('asdasd');
    return res.status(200).json(club);
  }
}
