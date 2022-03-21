import { Request, Response, NextFunction } from 'express';

import * as express from 'express';

import * as bodyParse from 'body-parser';

import { Login, Club, Match, Leaderboards } from './routers';

import { HttpStatusCode } from './utils';

class App {
  public app: express.Express;

  private httpStatusCode = HttpStatusCode;

  private loginRouter = new Login();

  private clubRouter = new Club();

  private matchRouter = new Match();

  private leaderboardsRouter = new Leaderboards();

  private parseJson = bodyParse;

  constructor() {
    this.app = express();

    this.config();

    this.app.use(this.parseJson.json());

    this.app.use('/login', this.loginRouter.router);

    this.app.use('/clubs', this.clubRouter.router);

    this.app.use('/matchs', this.matchRouter.router);

    this.app.use('/leaderboard', this.leaderboardsRouter.router);

    this.app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
      if (error instanceof Error) {
        return res
          .status(this.httpStatusCode.InternalServerError)
          .json({ message: error.message });
      }

      return res
        .status(this.httpStatusCode.InternalServerError)
        .json({ message: 'Something is wrong' });
    });
  }

  private config():void {
    const accessControl: express
      .RequestHandler = (_req: Request, res: Response, next: NextFunction) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
        res.header('Access-Control-Allow-Headers', '*');
        next();
      };

    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => {
      console.log(`server listen at port ${PORT}`);
    });
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
