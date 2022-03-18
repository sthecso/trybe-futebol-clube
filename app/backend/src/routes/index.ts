import { Router } from 'express';
import erro from '../controller/middlewares/domain';
import 'express-async-errors';
import userRoute from './route';
import clubRoute from './clubRoute';

const route = Router();
route.use(userRoute);
route.use(clubRoute);
route.use(erro);

export default route;
