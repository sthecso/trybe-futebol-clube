import { Application } from 'express';
import clubsRoutes from './clubsRoute';
import loginRoute from './loginRoute';

class Routes {
  public static routes(app: Application) {
    app.use('/login', loginRoute);
    app.use('/club', clubsRoutes);
  }
}

export default Routes;
