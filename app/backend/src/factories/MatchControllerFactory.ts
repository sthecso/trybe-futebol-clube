import { MatchController } from '../controllers';
import { MatchService } from '../services';

const MatchControllerFactory = (): MatchController => {
  const matchService = new MatchService();
  const matchController = new MatchController(matchService);
  return matchController;
};

export default MatchControllerFactory;
