import * as express from 'express';
import finishMatchController from './database/controllers/Matchs/finishMatch';
import getClubByIdController from './database/controllers/Clubs/getClubById';
import getClubsController from './database/controllers/Clubs/getClubs';
import getMatchsController from './database/controllers/Matchs/getMatchs';
import loginController from './database/controllers/Login/Login';
import postMatchController from './database/controllers/Matchs/postMatch';
import validateLoginController from './database/controllers/Middlewares/validateLogin';
import updateMatchController from './database/controllers/Matchs/updateMatch';
import getLeaderboardController from './database/controllers/Leaderboard/getLeader';

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

    this.app.get('/clubs', getClubsController);
    this.app.get('/clubs/:id', getClubByIdController);
    this.app.get('/login/validate', validateLoginController);
    this.app.get('/matchs', getMatchsController);
    this.app.get('/leaderboard/home', getLeaderboardController);

    this.app.post('/login', loginController);
    this.app.post('/matchs', postMatchController);

    this.app.patch('/matchs/:id', updateMatchController);
    this.app.patch('/matchs/:id/finish', finishMatchController);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => { console.log(`Listening on ${PORT}`); });
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
