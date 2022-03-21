import { Request, Response, Router } from 'express';
import MatchService from '../service/Match';

class Match {
  public router = Router();

  constructor() {
    this.get();
  }

  get() {
    this.router.get('/', async (req: Request, res: Response) => {
      const { inProgress } = req.query;
      if (typeof inProgress === 'string') {
        const matchs = await MatchService.findOneByInProgress(inProgress);
        return res.status(200).json(matchs);
      }
      const matchs = await MatchService.findAll();
      return res.status(200).json(matchs);
    });
  }
}

export default new Match().router;
