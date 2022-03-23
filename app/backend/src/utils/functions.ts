import regex from './regex';

export const isToken = (token: string) => regex.token.test(token);
export const isEmail = (email: string) => regex.email.test(email);
export const isHash = (hash: string) => regex.hash.test(hash);
