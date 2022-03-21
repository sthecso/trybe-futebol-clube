import * as express from 'express';
import * as bodyParser from 'body-parser';
// import route from './routes';
import 'express-async-errors';
import { Login } from './routes/LoginRoute';
import domainError from './controllers/middlewares/domainError';

class App {
  public app: express.Express;

  // private parseJson = bodyParser;

  constructor() {
    this.app = express();

    this.config();

    // this.app.use(bodyParser.json());
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
    this.app.use(domainError);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => {
      console.log(`Running at port ${PORT} ✨`);
    });
  }
}

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();

export { App };
