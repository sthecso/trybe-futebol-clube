import { LeaderboardService } from '../services';
import { LeaderboardController } from '../controllers';

const LeaderboardControllerFactory = (): LeaderboardController => {
  const leaderboardService = new LeaderboardService();
  const leaderboardController = new LeaderboardController(leaderboardService);
  return leaderboardController;
};

export default LeaderboardControllerFactory;
