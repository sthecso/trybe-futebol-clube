import * as express from 'express';
import 'express-async-errors';
import { joiError, domainError } from './middlewares';
import { loginRoute, clubRoute, matchRoute } from './routes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      /// 2 HORAS PROCURANDO O ERRO, TIVE QUE LIGAR O FRONT END NO LOCAL PRA DESCOBRIR QUE FALTAVA POR O PATCH
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());
    this.app.use('/login', loginRoute);
    this.app.use('/clubs', clubRoute);
    this.app.use('/matchs', matchRoute);

    this.app.use(domainError);
    this.app.use(joiError);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
