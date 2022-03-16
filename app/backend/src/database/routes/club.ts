import { Router } from 'express';
import controller from '../controllers/club';

const clubRouter = Router();

clubRouter.get('/', controller.getAll);

export default clubRouter;
