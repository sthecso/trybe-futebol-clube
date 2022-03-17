import * as express from 'express';

import * as bodyParse from 'body-parser';

import { Login, Club } from './routers';

class App {
  public app: express.Express;

  private loginRouter = new Login();

  private clubRouter = new Club();

  private parseJson = bodyParse;

  constructor() {
    this.app = express();

    this.config();

    this.app.use(this.parseJson.json());

    this.app.use('/login', this.loginRouter.router);

    this.app.use('/clubs', this.clubRouter.router);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => {
      console.log(`server listen at port ${PORT}`);
    });
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
