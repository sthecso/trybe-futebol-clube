import { Club } from '../database/models';

export const readAll = async () => {
  console.log(Club);
  const clubs = await Club.findAll();
  console.log('service', clubs);
  return clubs;
};

export default readAll;
