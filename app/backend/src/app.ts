import * as express from 'express';
import getClubByIdController from './database/controllers/getClubByIdController';
import getClubsController from './database/controllers/getClubsController';
import getMatchsController from './database/controllers/getMatchsController';
import loginController from './database/controllers/LoginController';
import validateLoginController from './database/controllers/validateLoginController';

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
    this.app.post('/login', loginController);
    this.app.get('/login/validate', validateLoginController);
    this.app.get('/clubs', getClubsController);
    this.app.get('/clubs/:id', getClubByIdController);
    this.app.get('/matchs', getMatchsController);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => {
      console.log(`Listening on ${PORT}`);
    });
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
