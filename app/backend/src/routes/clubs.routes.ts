import * as express from 'express';
import { ClubsController } from '../controllers';
import CommonRoutesConfig from './common.routes.config';

class ClubRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'ClubRoutes');
  }

  configureRoutes(): express.Application {
    this.app
      .route('/clubs')
      .get(ClubsController.getClubs);

    return this.app;
  }
}

export default ClubRoutes;
