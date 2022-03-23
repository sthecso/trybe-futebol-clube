import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import validateAuth from '../middleware/auth/authorization';
import MatchService from '../service/Match';

class Match {
  public router = Router();

  constructor() {
    this.get();
    this.post();
    this.patch();
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

  post() {
    this.router.post('/', validateAuth, async (req: Request, res: Response) => {
      const { inProgress } = req.body;
      if (inProgress) {
        const resultMatchCreated = await MatchService.create(req.body);
        return res.status(StatusCodes.CREATED).json(resultMatchCreated);
      }
    });
  }

  patch() {
    this.router.patch('/:id/finish', async (req: Request, res: Response) => {
      const { id } = req.params;
      res.status(StatusCodes.CREATED).json(id);
    });
  }
}

export default new Match().router;
