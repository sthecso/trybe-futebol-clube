import { Request, Response } from 'express';
import { validateToken } from '../jwt';

export default class MatchsController {
  static async all(req: Request, res: Response) {
    console.log(req.body);
    // token
    const { token } = req.body;

    return res.status(200).json({ message: 'ok' });
  }
}
