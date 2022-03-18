import { readFile } from 'fs';
import * as path from 'path';

const filePath = path.join(__dirname, '../../jwt.evaluation.key');

const readFileDocumentSecret = () => {
  readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
    if (err) throw err;
    return (data);
  });
  return readFile;
};
// console.log(readFileDocumentSecret());
export default readFileDocumentSecret;
