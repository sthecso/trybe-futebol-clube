import { Request, Response } from 'express';
import { IMatch } from '../interfaces/IMatch';
// import validateWithJoi from '../helpers/joiValidation';
// import { matchSchema } from '../joi_schemas';
import { MatchService } from '../services';

class MatchController {
  private MatchService: MatchService;

  constructor() {
    this.MatchService = new MatchService();
  }

  getAll = async (req: Request, res: Response) => {
    const inProgress = req.query.inProgress as string | undefined;
    const matches = await this.MatchService.getAll(inProgress);
    res.status(200).json(matches);
  };

  create = async (req: Request, res: Response) => {
    // validateWithJoi(matchSchema, req.body);
    req.body.inProgress = true;
    const matchDetails: IMatch = req.body;
    const newMatch = await this.MatchService.create(matchDetails);
    res.status(201).json(newMatch);
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const matchId = Number(id);

    if (!matchId) {
      return res.status(400).json({ message: 'Invalid ID' });
    }

    const updatedMatch = await this.MatchService.update(req.body, matchId);
    res.status(200).json(updatedMatch);
  };

  finishMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!Number(id)) {
      return res.status(400).json({ message: 'Invalid Match ID' });
    }
    await this.MatchService.finishMatch(Number(id));
    res.status(200).json({ message: 'ok' });
  };
}

export default MatchController;
