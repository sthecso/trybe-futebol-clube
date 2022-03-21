import userModel from '../database/models/Users';

const findUser = async (email: string) => {
  const user = await userModel.findOne({ where: { email },
    attributes: { exclude: ['password'] } });

  return user;
};

export default findUser;
