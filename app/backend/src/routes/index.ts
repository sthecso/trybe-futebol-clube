import { Application } from 'express';
import loginRouter from './login';

export default class Routes {
  public static routes(app: Application) {
    app.use('/login', loginRouter);
  }
}
