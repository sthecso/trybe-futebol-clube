import userModel from '../database/models/User';
import UserType from '../Types/User';

const getByEmail = async (email: string): Promise<UserType> => {
  const user = await userModel.findOne({
    where: { email },
    raw: true,
  });
  return user as UserType;
};

const lala = 'la';

export { getByEmail, lala };
