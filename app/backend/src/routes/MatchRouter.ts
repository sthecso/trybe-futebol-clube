import { MatchController } from '../controllers';
import Router from './Router';

class MatchRouter extends Router {
  private MatchController: MatchController;

  constructor() {
    super();
    this.MatchController = new MatchController();
    this.route();
  }

  route() {
    this.router.get('/', this.MatchController.getAll);
  }
}

export default MatchRouter;
