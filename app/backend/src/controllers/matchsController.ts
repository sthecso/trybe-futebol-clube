import { Request, Response } from 'express';
import MatchsService from '../services/matchsService';

export default class MatchsController {
  public static async getAll(_req: Request, res: Response) {
    const service = await MatchsService.getAll();

    res.status(200).json(service);
  }

  // public static async getById(req: Request, res: Response) {
  //   const { id } = req.params;
  //   const service = await Service.getById(id);

  //   res.status(200).json(service);
  // }
}
