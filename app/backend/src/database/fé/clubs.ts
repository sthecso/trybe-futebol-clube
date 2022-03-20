import Clubs from '../models/clubs';

interface IClubsDTO{
  id:number,
  'club_name':string
}
interface IClubsCamelDTO {
  id:number,
  clubName:string
}

class ClearClubs {
  private _metodos = Clubs;

  async findAll():Promise<IClubsCamelDTO[]> {
    const result = await this._metodos.findAll({ raw: true });

    const allClubs = result as unknown as IClubsDTO[];
    const snakeCase = allClubs.map((club) => ({
      id: club.id,
      clubName: club.club_name,

    }));
    return snakeCase;
  }

  async findId(id:number):Promise<IClubsCamelDTO | null> {
    const result = await this._metodos.findByPk(id, { raw: true });
    const club = result as unknown as IClubsDTO | null;
    if (!club) return null;
    return {
      id: club.id,
      clubName: club.club_name,
    };
  }
}

export default ClearClubs;
