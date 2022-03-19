import * as express from 'express';
import 'express-async-errors';

// import verifyToken from './middleware/token';

import ClubsController from './controllers/ClubsControllers';
import LoginController from './controllers/LoginControllers';
import MatchsController from './controllers/MatchsControllers';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
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

    this.app.post('/login', LoginController.login);

    // this.app.use(verifyToken);
    this.app.get('/login/validate', LoginController.validate);
    this.app.get('/matchs', MatchsController.all);
    this.app.post('/matchs', MatchsController.createMatch);
    this.app.patch('/matchs/:id', MatchsController.updateMatch);
    this.app.patch('/matchs/:id/finish', MatchsController.finishMatch);
    this.app.get('/clubs', ClubsController.all);
    this.app.get('/clubs/:id', ClubsController.club);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => {
      console.log('Servidor rodando na porta:', PORT);
    });
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
