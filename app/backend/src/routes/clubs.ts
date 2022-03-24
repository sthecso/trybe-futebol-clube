import { Router } from 'express';
import ClubsController from '../controllers/clubsController';

const router = Router();

router.get('/', ClubsController.getAll);
router.get('/:id', ClubsController.getById);

export default router;
