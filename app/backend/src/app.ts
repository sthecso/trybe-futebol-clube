import * as express from 'express';
import * as cors from 'cors';
import LoginController from './login/login.controller';

class App {
  public app: express.Express;
  // ...

  constructor() {
    // ...
    this.app = express();
    this.middlewares();
    this.routes();
    // ...
  }

  private middlewares(): void {
    this.app.use(express.json());
    this.app.use(cors());
  }

  private routes(): void {
    this.app.use('/login', LoginController.router);
  }

  // ...
  public start(PORT: string | number): void {
    this.app.listen(PORT);
    console.log(`Server running on port: ${PORT}`);
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
