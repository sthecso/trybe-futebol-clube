import Matchs from '../../models/Matchs';

async function finishMatchService(id: string) {
  await Matchs.update({ inProgress: false }, { where: { id } });
}

export default finishMatchService;
