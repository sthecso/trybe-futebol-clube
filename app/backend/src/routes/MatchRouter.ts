import auth from '../controllers/middlewares/auth';
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
    this.router.post('/', auth, this.MatchController.create);
    this.router.patch('/:id/finish', this.MatchController.finishMatch);
    this.router.patch('/:id', this.MatchController.update);
  }
}

export default MatchRouter;
