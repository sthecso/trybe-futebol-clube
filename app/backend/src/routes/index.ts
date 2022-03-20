import { Router } from 'express';
import erro from '../controller/middlewares/domain';
import 'express-async-errors';
import userRoute from './route';
import clubRoute from './clubRoute';
import matchRoute from './matchRoute';

const route = Router();
route.use(userRoute);
route.use(clubRoute);
route.use(matchRoute);
route.use(erro);

export default route;
