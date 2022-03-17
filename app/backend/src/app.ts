import * as express from 'express';
import testFunction from './testando';
import rootRoute from './Routes/root';
import InternalErrorHandler from './Utils/InternalErrorHandler';
import clubsRoute from './Routes/clubs';
import matchsRoute from './Routes/matchs';

class App {
  public app: express.Express;
  // ...

  constructor() {
    // ...
    this.app = express();
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
    this.app.use(rootRoute);
    this.app.use('/clubs', clubsRoute);
    this.app.use('/matchs', matchsRoute);
    this.app.use(InternalErrorHandler);
  }

  // ...
  public start(PORT: string | number):void {
    testFunction();
    this.app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
