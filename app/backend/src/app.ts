import * as express from 'express';
import * as bodyParser from 'body-parser';
import 'express-async-errors';

import { Login } from './routes/LoginRoute';
import Club from './routes/ClubsRoutes';
import Matchs from './routes/MatchsRoutes';
import errorMessage from './middlewares/errorMessage';

class App {
  public app: express.Express;
  // ...

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

    this.app.use(bodyParser.json());
    this.app.use(accessControl);

    this.app.use('/login', Login);
    this.app.use('/clubs', Club);
    this.app.use('/matchs', Matchs);
    this.app.use(errorMessage);
  }

  // ...
  public start(PORT: string | number):void {
    this.app.listen(PORT, () => {
      console.log(`Started at port ${PORT}`);
    });
  }
}

export { App };
// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
