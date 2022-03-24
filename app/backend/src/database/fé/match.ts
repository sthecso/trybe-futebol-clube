import ModelMatchs from '../models/matchs';
import ModelClubs from '../models/clubs';
import ICreateMatchDTO, { Gols, IMatchsDT02, ISequelizeValuesDTO } from '../../interface/match';

interface ICreateMatchWithIdDTO extends ICreateMatchDTO{
  id:number
}

class Matchs {
  private _metodos = ModelMatchs;

  async findAll(): Promise<IMatchsDT02[]> {
    const result = await this._metodos.findAll(
      {
        include:
        [{ model: ModelClubs, as: 'homeClub', attributes: ['clubName'] },
          { model: ModelClubs, as: 'awayClub', attributes: ['clubName'] }],
      },
    );

    const allClubs = result as unknown as ISequelizeValuesDTO<IMatchsDT02>[];
    return allClubs.map((club) => club.dataValues);
  }

  async findSearch(progress: boolean): Promise<IMatchsDT02[]> {
    const result = await this._metodos.findAll({
      where: { inProgress: progress },
      include:
        [{ model: ModelClubs, as: 'homeClub', attributes: { exclude: ['id'] } },
          { model: ModelClubs, as: 'awayClub', attributes: ['clubName'] }],
    });
    const allClubs = result as unknown as ISequelizeValuesDTO<IMatchsDT02>[];
    return allClubs.map((club) => club.dataValues);
  }

  private orderkeys = (newMatch:ISequelizeValuesDTO<ICreateMatchWithIdDTO>) => ({
    id: newMatch.dataValues.id,
    homeTeam: newMatch.dataValues.homeTeam,
    homeTeamGoals: newMatch.dataValues.homeTeamGoals,
    awayTeam: newMatch.dataValues.awayTeam,
    awayTeamGoals: newMatch.dataValues.awayTeamGoals,
    inProgress: newMatch.dataValues.inProgress,
  });

  async create(match:ICreateMatchDTO):Promise<ICreateMatchWithIdDTO> {
    const result = await this._metodos.create(match);
    const createMatch = result as unknown as ISequelizeValuesDTO<ICreateMatchWithIdDTO>;
    return this.orderkeys(createMatch);
  }

  async update(id:number) {
    await this._metodos.update({ inProgress: false }, { where: { id } });
  }

  async updateGols(id:number, gols:Gols) {
    await this._metodos.update({ ...gols }, { where: { id } });
  }
}

export default Matchs;
