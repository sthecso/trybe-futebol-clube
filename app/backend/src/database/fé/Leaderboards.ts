import ModelMatchs from '../models/matchs';
import ModelClubs from '../models/clubs';
import { IMatchsDT02, ISequelizeValuesDTO } from '../../interface/match';
import IClubsCamelDTO from '../../interface/clubs';

class Leaderboards {
  private metodos = ModelMatchs;

  private times = ModelClubs;

  findAllClubs = async ():Promise<IClubsCamelDTO[]> => {
    const times = await this.times.findAll();
    const listTimes = times as unknown as ISequelizeValuesDTO<IClubsCamelDTO>[];
    return listTimes.map((time) => time.dataValues);
  };

  findAll = async ():Promise<IMatchsDT02[]> => {
    const result = await this.metodos.findAll({ where: { inProgress: false },
      include:
      [{ model: ModelClubs, as: 'homeClub', attributes: ['clubName'] },
        { model: ModelClubs, as: 'awayClub', attributes: ['clubName'] }],
    });
    const matchs = result as unknown as ISequelizeValuesDTO<IMatchsDT02>[];
    return matchs.map((match) => match.dataValues);
  };
}
export default Leaderboards;
