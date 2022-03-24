import { Router } from 'express';
import MatchsController from '../controllers/matchsController';

const router = Router();

router.get('/', MatchsController.getAll);

export default router;
