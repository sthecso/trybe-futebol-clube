import { Router } from 'express';
import domainError from '../controllers/middlewares/domainError';
import LoginRoute from './LoginRoute';

const route = Router();
route.use(LoginRoute);
route.use(domainError);

export default route;
