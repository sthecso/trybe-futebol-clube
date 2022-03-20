import { WhereOptions } from 'sequelize';

import Club from '../models/Club';

import { IClub } from '../../interfaces/club';

class ClubRepository {
  private Club = Club;

  async findAll(options?: WhereOptions<IClub>) {
    const clubs = await this.Club.findAll({ where: options });

    const justDataValuesOfClub = clubs.map((club) => (
      club.get({ plain: true })
    ));

    return justDataValuesOfClub;
  }

  async findById(id: number) {
    const club = await this.Club.findByPk(id);

    const justDataValuesOfClub = club?.get({ plain: true });

    return justDataValuesOfClub;
  }
}

export default ClubRepository;
