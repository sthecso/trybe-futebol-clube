import { readFileSync } from 'fs';
import * as path from 'path';

const key = readFileSync(path.join(__dirname, '../../jwt.evaluation.key'), 'utf8');

export default key;
