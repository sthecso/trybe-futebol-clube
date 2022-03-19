import * as express from 'express';
import { Express, RequestHandler, Request, Response, NextFunction } from 'express';
import router from './routes';
import errorHandler from './middlewares/errorHandler';
import notFoundHandler from './middlewares/notFoundHandler';

class App {
  public app: Express;
  // ...

  constructor() {
    // ...
    this.app = express();
    this.config();
    // ...
  }

  private config(): void {
    const accessControl: RequestHandler = (_req: Request, res: Response, next: NextFunction) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(router);
    this.app.use(errorHandler);
    this.app.use(notFoundHandler);
    // ...
  }

  // ...
  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console
      .log(`Server online on port \x1b[03;94m${PORT}\x1b[00m!`));
  }
}

export { App };

export const { app } = new App();
