import { Router } from 'express';
import { readAll } from '../controllers/club';

const clubRouter = Router();

clubRouter.get('/', readAll);

export default clubRouter;
