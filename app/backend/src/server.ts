import { App } from './app';
import userRouter from './database/routes/user';

import 'dotenv/config';

const PORT = process.env.PORT || 3001;

new App().start(PORT);
