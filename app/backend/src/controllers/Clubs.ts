import { Request, Response } from 'express';
import { ClubService } from '../services';

class ClubsController {
  static async getClubs(_req: Request, res: Response) {
    const { code, data } = await ClubService.getClubs();
    res.status(code).json(data);
  }
}

export default ClubsController;
