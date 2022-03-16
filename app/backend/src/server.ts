import { config } from 'dotenv';

import { App } from './app';

config();

const PORT = process.env.PORT || 3001;

new App().start(PORT);
