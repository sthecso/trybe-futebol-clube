import { App } from './app';

import 'dotenv/config';

const PORT = process.env.PORT || 3062;

new App().start(PORT);
