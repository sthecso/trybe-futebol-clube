import * as express from 'express';

import 'dotenv/config';

import LoginRouter from './database/routes/user';
import ClubRouter from './database/routes/club';
import MatchRouter from './database/routes/match';

class App {
  public app: express.Express;

  // ...
  private loginRouter = new LoginRouter();

  private clubRouter = new ClubRouter();

  private matchRouter = new MatchRouter();

  constructor() {
    // ...
    this.app = express();
    this.config();
    this.app.use(express.json());
    this.app.use('/login', this.loginRouter.router);
    this.app.use('/clubs', this.clubRouter.router);
    this.app.use('/matchs', this.matchRouter.router);
    // ...
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);

    // ...
  }

  // ...
  public start(PORT: string | number):void {
    this.app.listen(PORT, () => {
      console.log(`Rodando na porta ${PORT}`);
    });
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
