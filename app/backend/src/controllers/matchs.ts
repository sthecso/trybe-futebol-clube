import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import matchsValidation from '../middlewares/validation/matchsValidation';
import { findAllMatchs, createMatch, updateInProgress } from '../service/matchs';

const routerMatchs = express.Router();

routerMatchs.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await findAllMatchs(req.query.inProgress as string);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
);

routerMatchs.post(
  '/',
  matchsValidation,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await createMatch(req.body);
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },
);

routerMatchs.patch(
  '/:id/finish',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const updated = await updateInProgress(Number(id));
      return res.status(200).json(updated);
    } catch (error) {
      next(error);
    }
  },
);

export default routerMatchs;
