import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import findAllMatchs from '../service/matchs';

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

export default routerMatchs;
