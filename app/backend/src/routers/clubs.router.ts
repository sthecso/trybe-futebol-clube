import { Request, Response, Router } from 'express';
import { clubsControllerFactory } from '../factories';

const clubsController = clubsControllerFactory();

export default class Login {
  public router: Router;

  constructor() {
    this.router = Router();
    this.route();
  }

  private route(): void {
    this.router.get(
      '/',
      async (req: Request, res: Response) => {
        const { code, data } = await clubsController.getAllClubs();
        return res.status(code).json(data);
      },
    );

    this.router.get(
      '/:id',
      async (req: Request, res: Response) => {
        const { code, data } = await clubsController.getClubById(req.params.id);
        return res.status(code).json(data);
      },
    );
  }
}
