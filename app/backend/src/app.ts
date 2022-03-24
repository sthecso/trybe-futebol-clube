import * as express from 'express';
import * as cors from 'cors';
import Login from './routes/login';
import Clubs from './routes/clubs';
import domain from './controller/erros/handleErros';
import Matchs from './routes/matchs';
import Leaderboards from './routes/leaderboards';

class App {
  public app: express.Express;
  // ...

  constructor() {
    // ...
    this.app = express();
    this.app.use(cors());
    this.config();
    this.routes();
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

  public routes() {
    this.app.use(express.json());
    this.app.use('/login', Login);
    this.app.use('/clubs', Clubs);
    this.app.use('/matchs', Matchs);
    this.app.use('/leaderboard', Leaderboards);
    this.app.use(domain);
  }

  // ...
  public start(PORT: string | number):void {
    // ...

    this.app.listen(PORT, () => {
      console.log(`ouvindo na porta ${PORT}`);
    });
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
