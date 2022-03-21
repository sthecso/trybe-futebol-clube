import { Request, Response } from 'express';
import { ClubsService } from '../../services';

export default class ClubsController {
  private service: ClubsService;

  constructor() {
    this.service = new ClubsService();
    this.getClubs = this.getClubs.bind(this);
  }

  async getClubs(req: Request, res: Response) {
    const { code, clubs } = await this.service.clubsRequest();

    return res.status(code).json(clubs);
  }
}
