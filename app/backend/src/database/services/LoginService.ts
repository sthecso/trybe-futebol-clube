import { compare } from 'bcryptjs';
import { User } from '../../helpers/Interfaces';
import Users from '../models/Users';
import { generateToken } from '../../helpers/token';

const MESSAGE_ERROR = { message: 'Incorrect email or password' };

async function loginService(receivedEmail: string, password: string) {
  const users = await Users.findOne({ where: { email: receivedEmail } });
  if (users === null) { return { code: 401, payload: MESSAGE_ERROR }; }
  const passwordValid = await compare(password, users.password);
  if (!passwordValid) { return { code: 401, payload: MESSAGE_ERROR }; }
  const user = users as unknown as User;
  const token = generateToken(user);
  const { id, email, role, username } = user;
  return { code: 200, payload: { user: { id, email, role, username }, token } };
}

export default loginService;
