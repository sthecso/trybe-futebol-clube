import * as express from 'express';
// import * as bodyParser from 'body-parser';
import loginController from './controllers/loginController';
import errorMiddlweare from './controllers/middlewares/errorMiddlweare';
import joiError from './controllers/middlewares/joiError';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.initializeErrorHandling();
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

  public initializeErrorHandling() {
    this.app.use(joiError);
    this.app.use(errorMiddlweare);
  }

  public routes() {
    this.app.use(loginController.router);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => {
      console.log(`listening on ${PORT}`);
    });
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
