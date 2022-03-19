import Club from '../database/models/Club';
import { IClub } from '../utils/interfaces';

class ClubRepository {
  public static async findAll(): Promise<IClub[]> {
    const result = await Club.findAll({ raw: true });
    return result as unknown as IClub[];
  }

  public static async findById(id: IClub['id']): Promise<IClub> {
    const result = await Club.findByPk(id, { raw: true });
    return result as unknown as IClub;
  }
}

export default ClubRepository;
