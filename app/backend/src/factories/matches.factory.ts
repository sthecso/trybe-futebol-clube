import { MatchesRepository, ClubsRepository } from '../repositories';
import { MatchesService } from '../services';

export const matchesFactory = () => (
  new MatchesService(new MatchesRepository(), new ClubsRepository())
);
