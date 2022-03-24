import * as express from 'express';
import { MatchController } from '../controllers';
import CommonRoutesConfig from './common.routes.config';

class MatchRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'MatchRoutes');
  }

  configureRoutes(): express.Application {
    this.app
      .route('/matchs')
      .get(MatchController.getMatchs);

    this.app
      .route('/matchs')
      .get(MatchController.getMatchsInProgress);
    return this.app;
  }
}

export default MatchRoutes;
