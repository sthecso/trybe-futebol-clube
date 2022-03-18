import { readFileSync } from 'fs';
import * as path from 'path';

const filePath = path.join(__dirname, '../../jwt.evaluation.key');

const readFileDocumentSecret = () => {
  const token = readFileSync(filePath, 'utf-8');
  return token;
};
export default readFileDocumentSecret;
