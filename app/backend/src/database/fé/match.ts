import ModeelMatchs from '../models/matchs';
import ModelClubs from '../models/clubs';
import ICreateMatchDTO from '../../interface/match';

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
interface ICreateMatchWithIdDTO extends ICreateMatchDTO{
  id:number
}
interface XablauORetorno {
  desconnhecido: string,
  dataValues:ICreateMatchWithIdDTO
}

class Matchs {
  private _metodos = ModeelMatchs;

  async findAll(): Promise<IMatchsDT02[]> {
    const result = await this._metodos.findAll(
      {
        include:
        [{ model: ModelClubs, as: 'homeClub', attributes: ['clubName'] },
          { model: ModelClubs, as: 'awayClub', attributes: ['clubName'] }],
      },
    );

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

  private orderkeys = (newMatch:XablauORetorno) => ({
    id: newMatch.dataValues.id,
    homeTeam: newMatch.dataValues.homeTeam,
    homeTeamGoals: newMatch.dataValues.homeTeamGoals,
    awayTeam: newMatch.dataValues.awayTeam,
    awayTeamGoals: newMatch.dataValues.awayTeamGoals,
    inProgress: newMatch.dataValues.inProgress,
  });

  async create(match:ICreateMatchDTO):Promise<ICreateMatchWithIdDTO> {
    const result = await this._metodos.create(match);
    const createMatch = result as unknown as XablauORetorno;
    return this.orderkeys(createMatch);
  }

  async update(id:number) {
    await this._metodos.update({ inProgress: false }, { where: { id } });
  }
}

export default Matchs;
