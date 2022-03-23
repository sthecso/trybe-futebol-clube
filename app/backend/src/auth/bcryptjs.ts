import { genSaltSync, hashSync, compareSync } from 'bcryptjs';

export const createSalt = (num: number): string => genSaltSync(num);
export const createHash = (password: string, salt: string): string => hashSync(password, salt);
export const validatePassword = (password: string, hash: string) => compareSync(password, hash);
