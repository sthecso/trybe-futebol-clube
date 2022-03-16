import { compare } from 'bcryptjs';
import { User } from '../../utils/Interfaces';
import Users from '../models/Users';
import { generateToken } from '../../utils/token';

async function loginService(receivedEmail: string, password: string) {
  const users = await Users.findOne({ where: { email: receivedEmail } });
  if (users === null) {
    return { code: 401, payload: { message: 'Incorrect email or password' } };
  }
  const passwordValid = await compare(password, users.password);
  if (!passwordValid) {
    return { code: 401, payload: { message: 'Incorrect email or password' } };
  }
  const user = users as unknown as User; // lint que mandou
  const token = generateToken(user);
  const { id, email, role, username } = user;
  return { code: 200, payload: { user: { id, email, role, username }, token } };
}

export default loginService;
