import { ILeaderBoard } from '../interfaces/ILeaderBoard';
import { IMatchesTeam } from '../interfaces/IMatchs';
import Clubs from '../database/models/Clubs';
import Matchs from '../database/models/Matchs';
import Board from '../utils/Board';

class LeaderBoardService {
  private _ClubsModel = Clubs;

  public getAll = async () => {
    const matches = await this._ClubsModel.findAll({
      include: [{
        model: Matchs,
        as: 'homeClub',
        where: {
          inProgress: false,
        },
      }],
    }) as unknown as IMatchesTeam[];
    return LeaderBoardService.structureMatches(matches);
  };

  private static structureMatches = (matches: IMatchesTeam[]) => {
    const structuring = matches.map((c: IMatchesTeam) => {
      const callBoard = Board.receiveHomeClub(c.clubName, c.homeClub);
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
    if (a.goalsFavor > b.goalsFavor) return -1;
    if (a.goalsFavor < b.goalsFavor) return 1;
    if (a.goalsOwn > b.goalsOwn) return -1;
    if (a.goalsOwn < b.goalsOwn) return 1;
    return 1;
  };
}

export default new LeaderBoardService();
