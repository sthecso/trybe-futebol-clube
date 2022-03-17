import { Request, Response, Router } from 'express';
import { MatchControllerFactory } from '../factories';

const matchRoute = Router();
const matchController = MatchControllerFactory();

matchRoute.get(
  '/',
  async (req: Request, res: Response): Promise<Response> => {
    const result = await matchController.get();

    return res.status(200).json(result);
  },
);

export default matchRoute;
