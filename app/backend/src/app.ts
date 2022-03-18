import * as express from 'express';
import routes from './app/routes';

class App {
  public app: express.Express = express();

  private route = routes;

  constructor() {
    this.app.use(express.json());
    this.config();
    this.endpoints();
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
  }

  private endpoints(): void {
    console.log('oi');
    this.app.use('/login', routes.login);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Listening to port ${PORT}!`));
  }
}

export { App };

export const { app } = new App();
