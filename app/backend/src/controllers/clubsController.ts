import { Request, Response } from 'express';
import ClubsService from '../services/clubsService';

export default class ClubsController {
  public static async getAll(req: Request, res: Response) {
    const service = await ClubsService.getAll();

    res.status(200).json(service);
  }

  public static async getById(req: Request, res: Response) {
    const { id } = req.params;
    const service = await ClubsService.getById(id);

    res.status(200).json(service);
  }
}
