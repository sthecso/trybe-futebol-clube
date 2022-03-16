import Match from '../models/match';

const getAll = async () => {
  const matchs = await Match.findAll();
  return matchs;
};

export default { getAll };
