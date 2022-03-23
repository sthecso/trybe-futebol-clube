import { Router } from 'express';
import { matchGoalsSchema } from '../schemas/joiSchemas';
import { validateJWT, validateSchema } from '../middlewares';
import { MatchController } from '../controllers';
import validateMatch from '../middlewares/validateMatch';

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
      validateMatch,
      // Teste se requisição não precisa passar por validação de conteúdo
      // validateSchema(matchSchema),
      this.matchController.postMatch,
    );
    this.router.patch(
      '/:id',
      validateSchema(matchGoalsSchema),
      this.matchController.editMatch,
    );
    this.router.patch('/:id/finish', this.matchController.finishMatch);
  }
}

export default MatchRouter;
