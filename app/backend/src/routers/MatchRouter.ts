import { Router } from 'express';
import { matchSchema } from '../schemas/joiSchemas';
import { validateJWT, validateSchema } from '../middlewares';
import { MatchController } from '../controllers';

class MatchRouter {
  public router: Router;

  private matchController: MatchController;

  constructor() {
    this.matchController = new MatchController();
    this.router = Router();
    this.route();
  }

  private route(): void {
    this.router.get('/', this.matchController.getMatchs);
    this.router.post(
      '/',
      validateJWT,
      validateSchema(matchSchema),
      this.matchController.postMatch,
    );
  }
}

export default MatchRouter;
