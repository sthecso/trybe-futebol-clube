import * as express from 'express';
import * as bodyParser from 'body-parser';
import Routes from './routes';

class App {
  public app: express.Express;

  public route: void;

  constructor() {
    this.app = express();
    this.config();
    this.app.use(bodyParser.json());
    this.route = Routes.routeApp(this.app);
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
    this.app.listen(PORT, () => console.log(
      `ouvindo na porta ${PORT}`,
    ));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
