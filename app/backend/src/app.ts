import * as express from 'express';
import { LoginRouter, ClubRouter } from './routers';

class App {
  public app: express.Express;
  // ...

  constructor() {
    // ...
    this.app = express();
    this.config();
    this.route();
    // ...
  }

  private config(): void {
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
    this.app.use('/clubs', new ClubRouter().router);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => {
      console.log('Server on', PORT);
    });
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
// test
export const { app } = new App();
