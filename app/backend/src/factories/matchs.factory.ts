import { MatchsRepository, ClubsRepository } from '../repositories';
import { MatchsService } from '../services';

export const matchsFactory = () => new MatchsService(new MatchsRepository(), new ClubsRepository());
