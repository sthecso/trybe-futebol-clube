import User from './database/models/User';
import secret from './Utils/secret';

const testFunction = async () => {
  console.log(secret);

  const clubs = await User.findAll({ raw: true });
  console.log(clubs);
};

export default testFunction;
