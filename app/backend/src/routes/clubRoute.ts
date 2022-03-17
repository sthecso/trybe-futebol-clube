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

clubRoute.get(
  '/:id',
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const result = await clubController.getById(Number(id));

    return res.status(200).json(result);
  },
);

export default clubRoute;
