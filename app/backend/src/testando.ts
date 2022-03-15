import User from './database/models/User';

const testFunction = async () => {
  console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');

  const clubs = await User.findAll({ raw: true });
  console.log(clubs);
};

export default testFunction;
