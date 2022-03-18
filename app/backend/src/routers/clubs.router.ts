import * as express from 'express';
import { clubsControllerFactory } from '../factories';

const clubsController = clubsControllerFactory();

export default class Login {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.route();
  }

  private route(): void {
    this.router.get(
      '/',
      async (req: express.Request, res: express.Response) => {
        const { code, data } = await clubsController.getAllClubs();
        return res.status(code).json(data);
      },
    );

    this.router.get(
      '/:id',
      async (req: express.Request, res: express.Response) => {
        const { code, data } = await clubsController.getClubById(req.params.id);
        return res.status(code).json(data);
      },
    );
  }
}
