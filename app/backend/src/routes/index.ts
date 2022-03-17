import { Router } from 'express';
import erro from '../controller/middlewares/domain';
import 'express-async-errors';
import userRoute from './route';

const route = Router();
route.use(userRoute);
route.use(erro);

export default route;
