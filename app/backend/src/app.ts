import * as express from 'express';
import 'express-async-errors';
import { LoginRouter } from './routes';
import { ErrorHandler } from './middlewares';
// import DomainError from './middlewares/domain-error';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
    this.route();
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

  private route(): void {
    this.app.use('/login', new LoginRouter().router);

    this.app.use(ErrorHandler.zodError());
    this.app.use(ErrorHandler.domainError());
    this.app.use(ErrorHandler.serverError());
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
