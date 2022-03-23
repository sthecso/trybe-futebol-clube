import { Request, Response, Router } from 'express';
import { MatchService } from '../../service';
import * as joiSchemas from '../../utils/joi.schemas';
import * as middlewares from '../middlewares';

export default class MatchesRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.getAll();
    this.getById();
    this.addMatch();
    this.finishMatch();
    this.updateMatchScore();
  }

  private getAll(): void {
    this.router.get('/', async (req: Request, res: Response) => {
      const { inProgress } = req.query;
      const progessStatus: boolean | undefined = JSON.parse(
        inProgress as string,
      );

      const { code, data } = await MatchService.getAll(progessStatus);
      return res.status(code).json(data);
    });
  }

  private getById(): void {
    this.router.get('/:id', async (req: Request, res: Response) => {
      const { code, data } = await MatchService.getById(req.params.id);

      return res.status(code).json(data);
    });
  }

  private addMatch(): void {
    this.router.post(
      '/',
      middlewares.validateJwt,
      middlewares.validateBody(joiSchemas.match),
      async (req: Request, res: Response) => {
        const { homeTeam, awayTeam } = req.body;
        if (homeTeam === awayTeam) {
          return res
            .status(409)
            .json({
              message:
                'It is not possible to create a match with two equal teams',
            });
        }

        const { code, data } = await MatchService.addMatch(req.body);

        return res.status(code).json(data);
      },
    );
  }

  private finishMatch(): void {
    this.router.patch('/:id/finish', async (req: Request, res: Response) => {
      const { code, data } = await MatchService.finishMatch(req.params.id);

      return res.status(code).json(data);
    });
  }

  private updateMatchScore(): void {
    this.router.patch('/:id', async (req: Request, res: Response) => {
      const { code, data } = await MatchService.updateMatchScore(
        req.params.id,
        req.body,
      );

      return res.status(code).json(data);
    });
  }
}
