import { Application } from 'express';

export default class Routes {
  public static routes(app: Application) {
    app.use('/', () => console.log('Rota'));
  }
}
