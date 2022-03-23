import * as express from 'express';
import 'express-async-errors';
import serverErrorHandler from './presenter/middlewares/errorHandlers/server';
import loginRouter from './presenter/routes/login/login';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
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

    this.app.use('/login', loginRouter);

    this.app.use(serverErrorHandler);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () =>
      console.log(`Running on http://localhost:${PORT}`));
  }
}

export { App };

export const { app } = new App();
