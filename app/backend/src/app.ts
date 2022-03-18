import * as express from 'express';
import * as cors from 'cors';
import { UserController } from './controllers/UserController';

class App {
  public app: express.Express;

  private _UserController = new UserController();

  constructor() {
    this.config();
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(cors());
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.post('/login', this._UserController.login);
  }

  // ...
  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Listening in port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
