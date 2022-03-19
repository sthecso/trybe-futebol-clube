import { Router } from 'express';
import domainError from '../controllers/middlewares/domainError';
// import 'express-async-errors';
import LoginRoute from './LoginRoute';

const route = Router();
route.use(LoginRoute);
route.use(domainError);

export default route;
