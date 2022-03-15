import * as express from 'express';
import * as cors from 'cors';
import 'dotenv/config';
import Routes from './routes/index';

// configuração feita de acordo com o site:
// https://stackoverflow.com/questions/33798933/nodejs-express-routes-as-es6-classes
class App {
  public app: express.Express;

  public routes: void;
  // ...

  constructor() {
    // ...
    this.app = express();
    this.config();
    this.routes = Routes.routes(this.app);

    // ...
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(cors());
    this.app.use(express.json());
    // ...
  }

  // ...
  public start(PORT: string | number):void {
    // ...
    this.app.listen(PORT, () => console.log('Rodando a API s2'));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
