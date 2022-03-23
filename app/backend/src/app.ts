import * as express from 'express';
import clubsRoutes from './routes/clubsRoutes';
import leaderboardRoutes from './routes/leaderboardRoutes';
import loginRoutes from './routes/loginRoutes';
import matchsRoutes from './routes/matchsRoutes';

class App {
  public app: express.Express;
  // ...

  constructor() {
    this.app = express();
    this.config();
    // ...
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT, PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());
    this.app.use(loginRoutes);
    this.app.use(clubsRoutes);
    this.app.use(matchsRoutes);
    this.app.use(leaderboardRoutes);
  }

  // ...
  public start(PORT: string | number): void {
    this.app.listen(PORT, () => {
      console.log(`Listening on ${PORT}`);
    });
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
