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

  async findOne({ where }: { where: WhereOptions<IClub> }) {
    const club = await this.Club.findOne({ where });

    const justDataValuesOfClub = club?.get({ plain: true });

    return justDataValuesOfClub;
  }
}

export default ClubRepository;
