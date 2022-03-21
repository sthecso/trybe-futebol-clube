import { ClubService } from '../../service';
import { ClubController } from '../../controller/controllers';
import { ClubRepository } from '../repository';

export default (): ClubController => {
  const clubService = new ClubService(ClubRepository);

  return new ClubController(clubService);
};
