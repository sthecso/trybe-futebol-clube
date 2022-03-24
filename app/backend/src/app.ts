import * as express from 'express';
import 'express-async-errors';
import bodyParser = require('body-parser');
import { ClubRouter, LeaderboardRouter, LoginRouter, MatchRouter } from './routes';
import errorHandler from './controllers/middlewares/errorHandler';
import joiError from './controllers/middlewares/joiError';
import tokenError from './controllers/middlewares/tokenError';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
    this.route();
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(bodyParser.json());
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => {
      console.log(`app rodando na porta ${PORT}`);
    });
  }

  private route() {
    this.app.use('/login', new LoginRouter().router);
    this.app.use('/clubs', new ClubRouter().router);
    this.app.use('/matchs', new MatchRouter().router);
    this.app.use('/leaderboard', new LeaderboardRouter().router);
    this.app.use(tokenError);
    this.app.use(joiError);
    this.app.use(errorHandler);
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
