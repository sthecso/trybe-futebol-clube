import { Router } from 'express';
import erro from '../controller/middlewares/domain';
import 'express-async-errors';
import loginRoute from './loginRoute';
import clubRoute from './clubRoute';
// import matchRoute from './matchRoute';

const route = Router();
route.use(loginRoute);
route.use(clubRoute);
// route.use(matchRoute);
route.use(erro);

export default route;
