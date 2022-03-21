import { Request, Response, Router } from 'express';
import { MatchsService } from '../services';
import * as middlewares from '../middlewares';
import * as joiSchemas from '../utils/joi.schemas';

export class MatchsRouter {
  public router: Router;

  private MatchsService: MatchsService;

  constructor() {
    this.MatchsService = new MatchsService();
    this.router = Router();
    this.getAllMatches();
    this.getMatchById();
    this.saveMatchInProgress();
    this.finisMatch();
    this.updateScore();
  }

  private getAllMatches(): void {
    this.router.get(
      '/',
      async (req: Request, res: Response) => {
        const { inProgress } = req.query;
        let inProgBool: boolean | undefined;
        // look for a way to improve this 👇
        if (inProgress === 'true') inProgBool = true;
        if (inProgress === 'false') inProgBool = false;

        const { code, data } = await this.MatchsService.findAll(inProgBool);
        return res.status(code).json(data);
      },
    );
  }

  private getMatchById(): void {
    this.router.get(
      '/:id',
      async (req: Request, res: Response) => {
        const { code, data } = await this.MatchsService.findById(req.params.id);

        return res.status(code).json(data);
      },
    );
  }

  private saveMatchInProgress(): void {
    this.router.post(
      '/',
      middlewares.jwtAuth,
      middlewares.validateBody(joiSchemas.newMatch),
      async (req: Request, res: Response) => {
        const { homeTeam, awayTeam } = req.body;
        // Try to move this validation to Joi
        if (homeTeam === awayTeam) {
          return res.status(409)
            .json({ message: 'It is not possible to create a match with two equal teams' });
        }

        const { code, data } = await this.MatchsService.saveMatchInProgress(req.body);

        return res.status(code).json(data);
      },
    );
  }

  private finisMatch(): void {
    this.router.patch(
      '/:id/finish',
      async (req: Request, res: Response) => {
        const { code, data } = await this.MatchsService.finishMatch(req.params.id);

        return res.status(code).json(data);
      },
    );
  }

  private updateScore(): void {
    this.router.patch(
      '/:id',
      async (req: Request, res: Response) => {
        const { code, data } = await this.MatchsService.updateScore(req.params.id, req.body);

        return res.status(code).json(data);
      },
    );
  }
}
