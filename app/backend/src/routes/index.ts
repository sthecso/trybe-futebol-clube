import { Application } from 'express';
import loginRouter from './login';
import clubsRouter from './clubs';

export default class Routes {
  public static routes(app: Application) {
    app.use('/login', loginRouter);
    app.use('/clubs', clubsRouter);
  }
}
