import * as express from 'express';

import 'dotenv/config';
import userRouter from './database/routes/user';
import clubRouter from './database/routes/club';
import matchRouter from './database/routes/match';

class App {
  public app: express.Express;
  // ...

  constructor() {
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
    this.app.use('/login', userRouter);
    this.app.use('/clubs', clubRouter);
    this.app.use('/matchs', matchRouter);
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
