import * as bcrypt from 'bcryptjs';

const hash = async (password: string) => bcrypt.hash(password, 10);

const compare = async (password: string, passHash: string) => bcrypt.compare(password, passHash);

export {
  hash,
  compare,
};
