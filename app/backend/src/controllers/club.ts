import { Request, Response } from 'express';
import ClubModel from '../models/club';
import StatusCode from '../utils/statusCode';

class ClubController {
  private clubModel = new ClubModel();

  private statusCode = StatusCode;

  constructor() {
    this.getAllClubs = this.getAllClubs.bind(this);
    this.findOneClub = this.findOneClub.bind(this);
  }

  async getAllClubs(req: Request, res: Response) {
    const clubs = await this.clubModel.getAllClubs();

    if (clubs === null) {
      return res.status(this.statusCode.NotFound)
        .json({ message: 'nenhum club encontrado' });
    }

    return res.status(this.statusCode.Ok).json(clubs);
  }

  async findOneClub(req:Request, res: Response) {
    const id = Number(req.params.id);
    const club = await this.clubModel.findOneClub(id);
    if (club === null) {
      return res.status(this.statusCode.NotFound)
        .json({ message: 'club nao encontrado' });
    }

    return res.status(this.statusCode.Ok).json(club);
  }
}

export default ClubController;
