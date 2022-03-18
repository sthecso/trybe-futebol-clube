import User from '../database/models/User';
import { IUserLogin } from '../utils/interfaces';
import { compareSync, hashSync } from 'bcryptjs';

const userServices = {
  loginUser: async (body:IUserLogin) => {
    const { email, password} = body;

    const user = await User.findOne({
      where: { email },
      raw: true
    });

    const isPasswordValid = user && compareSync(password, user.password);

    if(isPasswordValid) {
      const result = await User.findOne({
        where: { email },
        attributes: { exclude: ['password'] },
      });
    return result;
    }
    return null;
  },
};

export default userServices;
