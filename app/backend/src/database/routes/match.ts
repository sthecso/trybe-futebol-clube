import { Router } from 'express';
import controller from '../controllers/match';

const matchRouter = Router();

matchRouter.get('/', controller.getAll);

export default matchRouter;
