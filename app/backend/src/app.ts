import express, { Express } from 'express';
import 'express-async-errors';
import { errorHandler } from './middlewares';
import { LoginRouter, ClubsRouter, MatchesRouter, LeaderboardRouter } from './routers';

class App {
  public app: Express;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.errorHandler();
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.use('/login', new LoginRouter().router);
    this.app.use('/clubs', new ClubsRouter().router);
    this.app.use('/matches', new MatchesRouter().router);
    this.app.use('/leaderboard', new LeaderboardRouter().router);
  }

  private errorHandler(): void {
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
