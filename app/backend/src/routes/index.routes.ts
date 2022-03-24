import { Router } from 'express';
import route from './login.routes';

const routeMain = Router();

routeMain.use('/login', route);

export default routeMain;
