import * as express from 'express';
import matchsService from '../services/matchsService';

const matchsController = {
  getAll: async (req: express.Request, res: express.Response) => {
    const { inProgress } = req.query;
    const inProgressBool = inProgress === 'true';

    const matchs = inProgress
      ? await matchsService.getAllWithQuery(inProgressBool)
      : await matchsService.getAll();
    return res.status(200).send(matchs);
  },
  create: async (req: express.Request, res: express.Response) => {
    const { inProgress, homeTeam, awayTeam } = req.body;
    const inProgressBool = inProgress === 'true';
    try {
      if (homeTeam === awayTeam) {
        const error = new Error('It is not possible to create a match with two equal teams');
        throw error;
      }
      const match = await matchsService.create({
        ...req.body, inProgressBool,
      });
      return res.status(201).send(match);
    } catch (error) {
      const { message } = error as Error;
      return res.status(401).json({ message });
    }
  },
  finishMatch: async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    await matchsService.finishMatch(id);
    return res.status(200).send({ message: 'Finished match' });
  },
};

export default matchsController;
