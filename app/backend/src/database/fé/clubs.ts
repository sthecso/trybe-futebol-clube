import Clubs from '../models/clubs';
import IClubsCamelDTO from '../../interface/clubs';

class ClearClubs {
  private _metodos = Clubs;

  async findAll():Promise<IClubsCamelDTO[]> {
    const result = await this._metodos.findAll({ raw: true });
    const clubs = result as unknown as IClubsCamelDTO[];
    return clubs;
  }

  async findId(id:number):Promise<IClubsCamelDTO | null> {
    const result = await this._metodos.findByPk(id, { raw: true });
    const club = result as unknown as IClubsCamelDTO | null;
    return club;
  }

  async findAllIds(id1:number, id2:number) {
    const result = await this._metodos.findAll({ where: { id: [id1, id2] }, raw: true });
    const club = result as unknown as IClubsCamelDTO[];
    return club;
  }
}

export default ClearClubs;
