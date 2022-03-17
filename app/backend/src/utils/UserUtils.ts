import { compare } from 'bcryptjs';

const invalidMessage = 'Incorrect email or password';

const emailInvalide = (email: string) => {
  if (email === null || email === undefined) { return invalidMessage; }
  if (!email || email.length === 0) { return 'All fields must be filled'; }
  return null;
};

const passwordInvalide = (password: string) => {
  if (password === null || password === undefined) { return invalidMessage; }
  if (!password || password.length === 0) { return 'All fields must be filled'; }
  return null;
};

const passwordCompare = async (password: string, userPassword: string) => {
  const result = await compare(password, userPassword);
  return !result ? invalidMessage : null;
};

export { emailInvalide, passwordInvalide, passwordCompare };
