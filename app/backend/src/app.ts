import * as express from 'express';
import ClubController from './controllers/ClubController';
import LoginController from './controllers/LoginController';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());

    this.app.post('/login', LoginController.login);
    this.app.get('/login/validate', LoginController.validate);
    this.app.get('/clubs', ClubController.all);
    this.app.get('/clubs/:id', ClubController.club);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => {
      console.log(`Servidor rodando na porta$ ${PORT}`);
    });
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
