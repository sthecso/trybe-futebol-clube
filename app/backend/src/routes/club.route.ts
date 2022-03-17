import { Request, Response, Router } from 'express';
import { clubControllerFactory } from '../factories';

const clubRoute = Router();
const clubController = clubControllerFactory();

clubRoute.get(
  '/',
  async (req: Request, res: Response): Promise<Response> => {
    const result = await clubController.get();

    return res.status(200).json(result);
  },
);

export default clubRoute;
