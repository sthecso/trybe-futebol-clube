import { Request, Response, Router } from 'express';
import ClubService from '../service/Club';

class Club {
  public router = Router();

  constructor() {
    this.get();
  }

  get() {
    this.router.get('/', async (req: Request, res: Response) => {
      const allTeams = await ClubService.findAll();
      res.status(200).json(allTeams);
    });

    this.router.get('/:id', async (req: Request, res: Response) => {
      const { id } = req.params;
      const oneTeam = await ClubService.findOneById(id);
      res.status(200).json(oneTeam);
    });
  }
}

export default new Club().router;
