import * as cors from 'cors';
import * as express from 'express';
import validateJWT from './auth/validateJWT';
import Clubs from './database/models/Club';
import Matchs from './database/models/Match';
import routesLogin from './routes';

require('express-async-errors');

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
    this.hello();
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
    this.app.use(cors());
    this.app.use(routesLogin);
    this.app.use(validateJWT);
  }

  hello() {
    return this.app.get('/', async (_req, res) => {
      const club = await Clubs.findAll({
        include: { model: Matchs, as: 'club a' },
      });

      res.send(JSON.stringify(club));
    });
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => {
      console.log('iniciado porta:', PORT);
    });
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
