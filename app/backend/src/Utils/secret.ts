import * as fs from 'fs';

const secret = fs.readFileSync('jwt.evaluation.key', 'utf8');

export default secret;
