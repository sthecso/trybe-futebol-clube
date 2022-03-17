import { Request, Response } from 'express';
import { MatchsService } from '../services';

export default class MatchsController {
  private matchsService: MatchsService;

  constructor() {
    this.matchsService = new MatchsService();
    this.findAll = this.findAll.bind(this);
    this.findById = this.findById.bind(this);
    this.saveMatchInProgress = this.saveMatchInProgress.bind(this);
    this.finishMatch = this.finishMatch.bind(this);
    this.updateScore = this.updateScore.bind(this);
  }

  async findAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    let inProgBool: boolean | undefined;
    // look for a way to improve this 👇
    if (inProgress === 'true') inProgBool = true;
    if (inProgress === 'false') inProgBool = false;

    const { code, data } = await this.matchsService.findAll(inProgBool);
    return res.status(code).json(data);
  }

  async findById(req: Request, res: Response) {
    const { code, data } = await this.matchsService.findById(req.params.id);

    return res.status(code).json(data);
  }

  async saveMatchInProgress(req: Request, res: Response) {
    const { homeTeam, awayTeam } = req.body;
    // Try to move this validation to Joi
    if (homeTeam === awayTeam) {
      return res.status(401) // 401 ???
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }

    const { code, data } = await this.matchsService.saveMatchInProgress(req.body);

    return res.status(code).json(data);
  }

  async finishMatch(req: Request, res: Response) {
    const { code, data } = await this.matchsService.finishMatch(req.params.id);

    return res.status(code).json(data);
  }

  async updateScore(req: Request, res: Response) {
    const { code, data } = await this.matchsService.updateScore(req.params.id, req.body);

    return res.status(code).json(data);
  }
}
