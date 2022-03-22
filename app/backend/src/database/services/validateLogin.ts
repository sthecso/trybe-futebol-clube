import { TokenReturn } from '../../helpers/Interfaces';
import { verifyToken } from '../../helpers/token';
import Users from '../models/Users';

const MESSAGE_USER_NOTFOUND = { message: 'User not found' };

async function validateLoginService(token: string) {
  const user = verifyToken(token);
  const { data: { username } } = user as TokenReturn;
  const dbUser = await Users.findOne({ where: { username } });
  if (dbUser === null) { return { code: 401, payload: MESSAGE_USER_NOTFOUND }; }
  return { code: 200, payload: `${dbUser.role}` };
}

export default validateLoginService;
