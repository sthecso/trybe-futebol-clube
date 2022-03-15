import * as express from 'express';
import 'dotenv/config';
import * as cors from 'cors';
import Routes from './routes';

class App {
  public app: express.Express;
  // ...

  public routes: void;

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
    this.app.listen(PORT, () => console.log('Rodando'));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
