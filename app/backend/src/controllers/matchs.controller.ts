import { Request, Response } from 'express';
import { MatchsService } from '../services';

export default class MatchsController {
  private matchsService: MatchsService;

  constructor() {
    this.matchsService = new MatchsService();
    this.findAll = this.findAll.bind(this);
  }

  async findAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    let inProgBool: boolean | undefined;

    if (inProgress === 'true') inProgBool = true;
    if (inProgress === 'false') inProgBool = false;

    const { code, data } = await this.matchsService.findAll(inProgBool);
    return res.status(code).json(data);
  }
}
