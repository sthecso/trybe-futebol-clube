import * as express from 'express';
import Clubs from './database/models/Club';
import Matchs from './database/models/Match';

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
