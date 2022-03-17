import * as express from 'express';

import * as bodyParser from 'body-parser';

class App {
  public app: express.Express;

  private parseJson = bodyParser;

  constructor() {
    this.app = express();

    this.config();

    this.app.use(this.parseJson.json());
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
      console.log(`Running at port ${PORT} ✨`);
    });
  }
}

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();

export { App };
