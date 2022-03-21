import { ClubsService } from '../services';
import { ClubsRepository } from '../repositories';

export const clubsFactory = () => new ClubsService(new ClubsRepository());
