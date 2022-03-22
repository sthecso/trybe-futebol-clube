import * as bcryptjs from 'bcryptjs';

const hash = async (password: string) => bcryptjs.hash(password, 10);

const compare = async (password: string, passHash: string) => bcryptjs.compare(password, passHash);

export {
  hash, compare,
};
