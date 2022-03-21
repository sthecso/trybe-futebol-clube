import Clubs from '../models/clubs';

interface IClubsCamelDTO {
  id:number,
  clubName:string
}

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
}

export default ClearClubs;
