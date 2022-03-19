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
};

export default matchsController;
