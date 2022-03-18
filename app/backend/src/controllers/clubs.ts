import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import { findAllClubs, findClubById } from '../service/clubs';

const routerClubs = express.Router();

routerClubs.get(
  '/',
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await findAllClubs();
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
);

routerClubs.get(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await findClubById(Number(id));
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
);

export default routerClubs;
