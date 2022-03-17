import * as express from 'express';
import {
  joiError,
  serverError,
} from './database/middlewares/error';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    // middlewares
    this.app.use(accessControl);
    this.app.use(express.json());
    this.app.use(joiError);
    this.app.use(serverError);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => {
      console.log(`Listening on port ${PORT} 🚀`);
    });
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
