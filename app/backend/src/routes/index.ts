import { Application } from 'express';
import routes from '../routes/loginRoutes';



export default class Routes {
  public static routeApp(app: Application) {
    app.use('/', routes);
  }
}