import Match from '../modelsSequelize/match';

const getAll = async () => {
  const matchs = await Match.findAll();
  return matchs;
};

/* const getByProgress = async (progressQuery) => {
  const match = await Match.findAll({ where: { in_progress: progressQuery } });
  return match; */

export default { getAll /* getByProgress */ };
