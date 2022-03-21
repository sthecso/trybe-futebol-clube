import { ClubsService } from '../services';
import { ClubsRepository } from '../repositories';

export const clubsFactory = (): ClubsService => new ClubsService(new ClubsRepository());
