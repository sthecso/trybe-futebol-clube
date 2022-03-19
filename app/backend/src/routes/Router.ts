import * as express from 'express';

abstract class Router {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
  }

  abstract route(): void;
}

export default Router;
