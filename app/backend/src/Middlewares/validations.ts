import { compare } from 'bcryptjs';

const invalidMessage = 'Incorrect email or password';
const emptyField = 'All fields must be filled';

const invalidEmail = (email: string) => {
  if (email === null || email === undefined) { return invalidMessage; }
  if (!email || email.length === 0) { return emptyField; }
  return null;
};

const invalidPassword = (password: string) => {
  if (password === null || password === undefined) { return invalidMessage; }
  if (!password || password.length === 0) { return emptyField; }
  return null;
};

const passwordCompare = async (password: string, userPassword: string) => {
  const result = await compare(password, userPassword);
  return !result ? invalidMessage : null;
};

export { invalidEmail, invalidPassword, passwordCompare };
