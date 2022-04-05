import { ILeaderBoard } from '../interfaces/ILeaderBoard';
import { IMatchesAwayTeam, IMatchesHomeTeam } from '../interfaces/IMatchs';
import Clubs from '../database/models/Clubs';
import Matchs from '../database/models/Matchs';
import HomeBoard from '../utils/HomeBoard';
import AwayBoard from '../utils/AwayBoard';

class LeaderBoardService {
  private _ClubsModel = Clubs;

  public getAllHomeMatches = async () => {
    const matches = await this._ClubsModel.findAll({
      include: [{
        model: Matchs,
        as: 'homeClub',
        where: {
          inProgress: false,
        },
      }],
    }) as unknown as IMatchesHomeTeam[];
    return LeaderBoardService.structureHomeMatches(matches);
  };

  public getAllAwayMatches = async () => {
    const matches = await this._ClubsModel.findAll({
      include: [{
        model: Matchs,
        as: 'awayClub',
        where: {
          inProgress: false,
        },
      }],
    }) as unknown as IMatchesAwayTeam[];
    return LeaderBoardService.structureAwayMatches(matches);
  };

  private static structureHomeMatches = (matches: IMatchesHomeTeam[]) => {
    const structuring = matches.map((c: IMatchesHomeTeam) => {
      const callBoard = HomeBoard.receiveHomeClub(c.clubName, c.homeClub);
      return callBoard;
    });
    const sorting = structuring.sort(LeaderBoardService.compare);
    return sorting;
  };

  private static structureAwayMatches = (matches: IMatchesAwayTeam[]) => {
    const structuring = matches.map((c: IMatchesAwayTeam) => {
      const callBoard = AwayBoard.receiveAwayClub(c.clubName, c.awayClub);
      return callBoard;
    });
    const sorting = structuring.sort(LeaderBoardService.compare);
    return sorting;
  };

  // referencies: https://pt.stackoverflow.com/questions/46600/como-ordenar-uma-array-de-objetos-com-array-sort
  private static compare = (a: ILeaderBoard, b: ILeaderBoard) => {
    if (a.totalPoints > b.totalPoints) return -1;
    if (a.totalPoints < b.totalPoints) return 1;
    if (a.totalVictories > b.totalVictories) return -1;
    if (a.totalVictories < b.totalVictories) return 1;
    if (a.goalsBalance > b.goalsBalance) return -1;
    if (a.goalsBalance < b.goalsBalance) return 1;
    if (a.goalsFavor > b.goalsFavor) return -1;
    if (a.goalsFavor < b.goalsFavor) return 1;
    if (a.goalsOwn > b.goalsOwn) return -1;
    return 1;
  };
}

export default new LeaderBoardService();
