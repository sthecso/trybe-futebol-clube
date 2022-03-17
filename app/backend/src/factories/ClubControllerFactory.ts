import { ClubService } from '../services';
import { ClubController } from '../controllers';

const clubControllerFactory = (): ClubController => {
  const clubService = new ClubService();
  const clubController = new ClubController(clubService);
  return clubController;
};

export default clubControllerFactory;
