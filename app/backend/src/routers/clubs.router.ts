import { Request, Response, Router } from 'express';
import { IClubsService } from '../interfaces';
import { clubsFactory } from '../factories';

const clubsService: IClubsService = clubsFactory();

export class ClubsRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.getAllClubs();
    this.getClubById();
  }

  private getAllClubs(): void {
    this.router.get(
      '/',
      async (req: Request, res: Response) => {
        const { code, data } = await clubsService.getAllClubs();
        return res.status(code).json(data);
      },
    );
  }

  private getClubById(): void {
    this.router.get(
      '/:id',
      async (req: Request, res: Response) => {
        const { code, data } = await clubsService.getClubById(req.params.id);
        return res.status(code).json(data);
      },
    );
  }
}
