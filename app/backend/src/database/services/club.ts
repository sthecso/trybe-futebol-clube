import Club from '../models/club';

const getAll = async () => {
  const clubs = await Club.findAll();
  return clubs;
};

export default { getAll };
