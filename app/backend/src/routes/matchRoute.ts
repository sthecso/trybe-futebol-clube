import { Request, Response, Router } from 'express';
import auth from '../middlewares/auth';
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

matchRoute.post(
  '/',
  auth,
  async (req: Request, res: Response): Promise<Response> => {
    const match = await matchController.add(req.body);

    return res.status(201).json(match);
  },
);

matchRoute.patch(
  '/:id/finish',
  async (req: Request, res: Response): Promise<Response> => {
    const match = await matchController.finish(req.params.id);

    return res.status(200).json({ message: match });
  },
);

export default matchRoute;
