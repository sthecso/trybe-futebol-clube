import { Request, Response } from 'express';
import ClubsService from '../services/clubsService';

export default class ClubsController {
  public static async getAll(req: Request, res: Response) {
    const service = await ClubsService.getAll();

    res.status(200).json(service);
  }
}
