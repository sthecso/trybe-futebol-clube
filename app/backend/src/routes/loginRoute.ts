import { Router } from 'express';

const loginRoute = Router();

loginRoute.post('/login', authController);

export default loginRoute;
