import * as express from 'express';
import 'express-async-errors';
import { errorHandler } from './middlewares';
import { ClubsRouter, LoginRouter, MatchsRouter } from './routers';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());
    this.app.use('/login', new LoginRouter().router);
    this.app.use('/clubs', new ClubsRouter().router);
    this.app.use('/matchs', new MatchsRouter().router);
    this.app.use(errorHandler);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => {
      console.log('Running on', PORT);
    });
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
