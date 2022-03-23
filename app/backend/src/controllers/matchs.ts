import { Request, Response } from 'express';
import { MatchsService } from '../services';

export default class MatchController {
  private service: MatchsService;

  constructor() {
    this.service = new MatchsService();
    this.getMatchs = this.getMatchs.bind(this);
  }

  async getMatchs(req: Request, res: Response) {
    const { code, matchs } = await this.service.matchRequest();

    return res.status(code).json(matchs);
  }
}
