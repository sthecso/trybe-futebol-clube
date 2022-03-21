import { ClubRepository } from '../repositories';
import { IClub } from '../utils/interfaces';

import * as messages from '../utils/messages';

import NotFoundError from './errors/NotFound';

class ClubService {
  public static async findAll() {
    const clubs: IClub[] = await ClubRepository.findAll();

    return clubs;
  }

  public static async findById(id: IClub['id']) {
    const club: IClub = await ClubRepository.findById(id);

    const err = new NotFoundError(messages.club.notFound);

    if (!club) throw err;

    return club;
  }
}

export default ClubService;
