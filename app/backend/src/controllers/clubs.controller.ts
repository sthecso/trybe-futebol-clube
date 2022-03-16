import { Request, Response } from 'express';
import { ClubsService } from '../services';

export default class ClubService {
  private clubsService: ClubsService;

  constructor() {
    this.clubsService = new ClubsService();
    this.findAll = this.findAll.bind(this);
    this.findById = this.findById.bind(this);
  }

  async findAll(_req: Request, res: Response) {
    const { code, data } = await this.clubsService.findAll();
    return res.status(code).json(data);
  }

  async findById(req: Request, res: Response) {
    const { code, data } = await this.clubsService.findById(req.params.id);

    return res.status(code).json(data);
  }
}
