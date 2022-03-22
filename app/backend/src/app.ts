import * as express from 'express';
import ClubController from './controllers/ClubController';
import LoginController from './controllers/LoginController';
import MatchController from './controllers/MatchController';
import LeaderboardController from './controllers/LeaderboardController';

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
    this.app.get('/login/validate', LoginController.validate);
    this.app.get('/matchs', MatchController.all);
    this.app.post('/matchs', MatchController.create);
    this.app.patch('/matchs/:id', MatchController.update);
    this.app.patch('/matchs/:id/finish', MatchController.finish);
    this.app.get('/clubs', ClubController.all);
    this.app.get('/clubs/:id', ClubController.club);
    this.app.get('/leaderboard/home', LeaderboardController.all);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => {
      console.log(`Servidor ouvindo na porta$ ${PORT}`);
    });
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
