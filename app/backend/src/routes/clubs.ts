import { Router } from 'express';
// import utilsJWT from '../auth/utilsJWT';
// import Validate from '../middlewares/validationLogin';
import ClubsController from '../controllers/clubsController';

const router = Router();

router.get('/', ClubsController.getAll);
router.get('/:id', ClubsController.getById);

export default router;
