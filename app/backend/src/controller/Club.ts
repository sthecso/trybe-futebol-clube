import { Request, Response, Router } from 'express';

class Club {
  public router = Router();

  constructor() {
    this.get();
  }

  get() {
    this.router.get('/', (req: Request, res: Response) => {
      res.status(200).json({ message: 'em construção' });
    });
  }
}

export default new Club().router;
