import { readFileSync } from 'fs';

const getFileData = (FILE: string): string => readFileSync(FILE, 'utf-8').trim() as string;

export default getFileData;
