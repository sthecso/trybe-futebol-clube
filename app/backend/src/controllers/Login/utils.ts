import { compare } from 'bcryptjs';

const invalidMessage = 'Incorrect email or password';

const passwordCompare = async (password: string, userPassword: string) => {
  const result = await compare(password, userPassword);
  return !result
    ? invalidMessage
    : null;
};

export default passwordCompare;
