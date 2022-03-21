import * as express from 'express';
import loginController from './Controller/loginController';
import clubsController from './Controller/clubsController';
import matchsController from './Controller/matchController';

class App {
  public app: express.Express;
  // ...

  constructor() {
    this.app = express();
    // ...
    this.config();
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
    this.app.use(express.json());
    this.app.use('/login', loginController);
    this.app.use('/clubs', clubsController);
    this.app.use('/matchs', matchsController);
    // ...
  }

  // ...
  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
    // ...
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
