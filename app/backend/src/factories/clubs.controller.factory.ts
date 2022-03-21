import { ClubsService } from '../services';
import { ClubsController } from '../controllers';
import { ClubsRepository } from '../repositories';

export default (): ClubsController => {
  const clubsService = new ClubsService(new ClubsRepository());
  return new ClubsController(clubsService);
};
