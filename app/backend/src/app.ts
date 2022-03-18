import * as express from 'express';
import Login from './routes/login';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
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


  private routes(): void {
    this.app.use('/login', Login)
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => {
      console.log(`Online in ${PORT}`)
    })
  }
}

export { App };

export const { app } = new App();
