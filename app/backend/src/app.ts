import * as express from 'express';
import LoginController from './login/login.controller';

class App {
  public app: express.Express;
  // ...

  constructor() {
    // ...
    this.app = express();
    this.middlewares();
    this.config();
    this.routes();
    // ...
  }

  private middlewares():void {
    this.app.use(express.json());
  }

  private routes():void {
    this.app.use('/', LoginController.router);
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

  // ...
  public start(PORT: string | number):void {
    this.app.listen(PORT);
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
