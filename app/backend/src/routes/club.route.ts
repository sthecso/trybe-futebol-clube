import { Request, Response, Router } from 'express';
import { clubControllerFactory } from '../factories';

const clubRoute = Router();
const clubController = clubControllerFactory();

clubRoute.get(
  '/',
  async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).json({});
  }
)

export default clubRoute;
