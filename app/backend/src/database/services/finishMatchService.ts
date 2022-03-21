import Matchs from '../models/Matchs';

async function finishMatchService(id: string) {
  const matchGottenById = await Matchs.findByPk(id);
  console.log(matchGottenById?.inProgress);
  await Matchs.update({ inProgress: false }, { where: { id } });
  const matchGottenByIdUpdated = await Matchs.findByPk(id);
  console.log(matchGottenByIdUpdated?.inProgress);
  console.log(id);
}

export default finishMatchService;
