import { Request, Response } from 'express';
import { ClubService } from '../services';

class ClubController {
  private clubService: ClubService;

  constructor() {
    this.clubService = new ClubService();
    this.getAll = this.getAll.bind(this);
  }

  async getAll(req: Request, res: Response) {
    const { code, data } = await this.clubService.getAll();
    return res.status(code).json(data);
  }
}

export default ClubController;
