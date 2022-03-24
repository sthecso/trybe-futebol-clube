import { Router } from 'express';
import { LoginController } from '../controllers';

export default class Login {
  public router: Router;

  constructor() {
    this.router = Router();
    this.route();
  }

  private route(): void {
    this.router.post('/', LoginController.login());
  }
}
