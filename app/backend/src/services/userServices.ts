import User from '../database/models/User';

const userServices = {
  getByEmail: async (email: string) => {
    const user = await User.findOne({
      where: { email },
      raw: true,
    });

    return user;
  },
};

export default userServices;
