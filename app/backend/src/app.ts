import * as express from 'express';
// import { Clubs } from './database/models/Clubs';

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
    // ...
  }

  // ...
  public start(PORT: string | number):void {
    this.app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
    this.app.get('/ping', (_req, res) => {
      res.send('pong');
    });
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
