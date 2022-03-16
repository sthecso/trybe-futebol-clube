import { TokenReturn } from '../../utils/Interfaces';
import { verifyToken } from '../../utils/token';
import Users from '../models/Users';

async function validateLoginService(token: string) {
  const user = verifyToken(token);
  const { data: { username } } = user as TokenReturn;
  const dbUser = await Users.findOne({ where: { username } });
  if (dbUser === null) {
    return { code: 401, payload: { message: 'User not found' } };
  }
  return { code: 200, payload: `${dbUser.role}` };
}

export default validateLoginService;
