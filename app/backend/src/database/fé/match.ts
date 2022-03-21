import ModeelMatchs from '../models/matchs';
import ModelClubs from '../models/clubs';

interface IMatchsDT02 {
  id: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
  homeClub: {
    clubName: string
  },
  awayClub: {
    clubName: string
  }
}
interface Xablau {
  desconnhecido: string,
  dataValues:IMatchsDT02
}
class Matchs {
  private _metodos = ModeelMatchs;

  async findAll(): Promise<IMatchsDT02[]> {
    const result = await this._metodos.findAll({
      include:
        [{ model: ModelClubs, as: 'homeClub', attributes: { exclude: ['id'] } },
          { model: ModelClubs, as: 'awayClub', attributes: ['clubName'] }],
    });

    const allClubs = result as unknown as Xablau[];
    return allClubs.map((club) => club.dataValues);
  }

  async findSearch(progress: boolean): Promise<IMatchsDT02[]> {
    const result = await this._metodos.findAll({
      where: { inProgress: progress },
      include:
        [{ model: ModelClubs, as: 'homeClub', attributes: { exclude: ['id'] } },
          { model: ModelClubs, as: 'awayClub', attributes: ['clubName'] }],
    });
    const allClubs = result as unknown as Xablau[];
    return allClubs.map((club) => club.dataValues);
  }
}

export default Matchs;
