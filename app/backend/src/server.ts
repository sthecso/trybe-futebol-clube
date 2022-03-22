import { App } from './app';
import 'dotenv/config';

// const { application } = express;

const PORT = process.env.PORT || 3001;

new App().start(PORT);
