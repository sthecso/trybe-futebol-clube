import { Request, Response, Router } from 'express';
import { MatchControllerFactory } from '../factories';

const matchRoute = Router();
const matchController = MatchControllerFactory();

matchRoute.get(
  '/',
  async (req: Request, res: Response): Promise<Response> => {
    const { inProgress } = req.query as unknown as { inProgress: string };
    let inProg: boolean | undefined;

    switch (inProgress) {
      case 'true':
        inProg = true;
        break;
      case 'false':
        inProg = false;
        break;
      default:
        inProg = undefined;
        break;
    }

    const matches = await matchController.get(inProg);

    return res.status(200).json(matches);
  },
);

export default matchRoute;
