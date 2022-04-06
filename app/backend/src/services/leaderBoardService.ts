import { ILeaderBoard } from '../interfaces/ILeaderBoard';
import { IMatchesAwayTeam, IMatchesHomeTeam } from '../interfaces/IMatchs';
import Clubs from '../database/models/Clubs';
import Matchs from '../database/models/Matchs';
import HomeBoard from '../utils/HomeBoard';
import AwayBoard from '../utils/AwayBoard';

class LeaderBoardService {
  private _ClubsModel = Clubs;

  // referencies: https://pt.stackoverflow.com/questions/493586/como-percorrer-um-array-de-objetos-somar-propriedades-espec%C3%ADficas-e-unificar-es
  public getAll = (homeMatches: ILeaderBoard[], awayMatches: ILeaderBoard[]) => {
    const merged = [...homeMatches, ...awayMatches];
    const allMatches = LeaderBoardService.orderAllMatches(merged);
    return allMatches.sort(LeaderBoardService.compare);
  };

  private static orderAllMatches = (merged: ILeaderBoard[]) => {
    const ordering = merged.reduce((acc, curr) => {
      const objRepetido = acc.find((elem) => elem.name === curr.name);
      if (objRepetido) {
        const totalPoints = objRepetido.totalPoints + curr.totalPoints;
        const totalGames = objRepetido.totalGames + curr.totalGames;
        objRepetido.totalPoints += curr.totalPoints;
        objRepetido.totalGames += curr.totalGames;
        objRepetido.totalVictories += curr.totalVictories;
        objRepetido.totalDraws += curr.totalDraws;
        objRepetido.totalLosses += curr.totalLosses;
        objRepetido.goalsFavor += curr.goalsFavor;
        objRepetido.goalsOwn += curr.goalsOwn;
        objRepetido.goalsBalance += curr.goalsBalance;
        objRepetido.efficiency = LeaderBoardService.calculateEfficieny(totalPoints, totalGames);
      } else acc.push(curr);
      return acc;
    }, [] as unknown as ILeaderBoard[]);
    return ordering;
  };

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

  private static calculateEfficieny = (
    totalPoints: number,
    totalGames: number,
  ) => {
    const calculating = parseFloat(
      ((totalPoints / (totalGames * 3)) * 100).toFixed(2),
    );

    return calculating;
  };
}

export default new LeaderBoardService();
