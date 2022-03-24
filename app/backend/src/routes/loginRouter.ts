import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { LoginController } from '../controllers';

export default class Login {
  public router: Router;

  constructor() {
    this.router = Router();
    this.route();
  }

  private route(): void {
    this.router.post(
      '/',
      async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const result = await LoginController.login({ email, password });

        res.status(StatusCodes.OK).json(result);
      },
    );

    // this.router.get(
    //   '/validate',
    //   async (req: Request, res: Response) => {
    //     const { authorization } = req.header;

    //     const result = await LoginController.validate(authorization);

    //     res.status(StatusCodes.OK).send(result);
    //   },
    // );
  }
}
