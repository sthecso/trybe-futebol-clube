import * as express from 'express';
import finishMatchController from './database/controllers/finishMatchController';
import getClubByIdController from './database/controllers/getClubByIdController';
import getClubsController from './database/controllers/getClubsController';
import getLeaderboardController from './database/controllers/getLeaderboardController';
import getMatchsController from './database/controllers/getMatchsController';
import loginController from './database/controllers/LoginController';
import postMatchController from './database/controllers/postMatchController';
import updateMatchController from './database/controllers/updateMatchController';
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
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
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
    this.app.post('/matchs', postMatchController);

    this.app.patch('/matchs/:id/finish', finishMatchController);
    this.app.patch('/matchs/:id', updateMatchController);

    this.app.get('/leaderboard/home', getLeaderboardController);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => {
      console.log(`Listening on ${PORT}`);
    });
  }
}

export { App };
export const { app } = new App();
