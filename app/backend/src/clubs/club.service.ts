import { Request, Response } from 'express';
import Club from '../database/models/Club';

class ClubService {
  constructor() {
    this.getAllClubs = this.getAllClubs.bind(this);
    this.getClubById = this.getClubById.bind(this);
  }

  // typeof club object | null
  _club: Club[] | null | Club;

  public async getAllClubs(req: Request, res: Response) {
    this._club = await Club.findAll();
    return res.status(200).json([...this._club]);
  }

  public async getClubById(req: Request, res: Response) {
    const { id } = req.params;
    this._club = await Club.findByPk(id);
    return res.status(200).json(this._club);
  }
}

export default new ClubService();
