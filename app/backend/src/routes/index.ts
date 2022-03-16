import { Application } from 'express';
import clubsRoutes from './clubsRoute';

class Routes {
  public static routes(app: Application) {
    // app.get('/', (req, res) => res.status(200).json({ message: 'Obrigada Caputo' }));
    app.use('/club', clubsRoutes);
  }
}

export default Routes;
