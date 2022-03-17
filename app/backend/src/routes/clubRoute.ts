import { Request, Response, Router } from 'express';

const clubRoute = Router();

clubRoute.get(
  '/',
  async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).json({});
  }
)

export default clubRoute;
