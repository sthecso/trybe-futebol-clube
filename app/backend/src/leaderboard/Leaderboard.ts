import { ILeaderBoardTeam } from '../interfaces';
import { ClubModel, MatchModel } from '../database/models';

class Leaderboard {
  private clubModel: typeof ClubModel;

  private matchModel: typeof MatchModel;

  private leaderBoard: ILeaderBoardTeam[];

  constructor() {
    this.clubModel = ClubModel;
    this.matchModel = MatchModel;
    this.leaderBoard = [];
  }

  async createLeaderBoard() {
    const clubs = await this.clubModel.findAll();
    const teams = clubs.map((club) => {
      const { clubName } = club;
      return {
        name: clubName,
        totalPoints: 0,
        totalGames: 0,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 0,
        goalsOwn: 0,
        goalsBalance: 0,
        efficiency: 0,
      };
    });
    this.leaderBoard = teams;
  }

  // async calculateMatchs() {
  //   const matchs = await this.matchModel.findAll();
  //   matchs.forEach(async (match) => {
  //     const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = match;
  //     const { clubName: homeTeamName } = await this.clubModel.findByPk(homeTeam) as Club;
  //     const { clubName: awayTeamName } = await this.clubModel.findByPk(awayTeam) as Club;
  //     const homeClub = this.leaderBoard
  //       .find((club) => club.name === homeTeamName) as ILeaderBoardTeam;
  //     const awayClub = this.leaderBoard
  //       .find((club) => club.name === awayTeamName) as ILeaderBoardTeam;
  //     // this.resultMatch(homeClub, awayClub, homeTeamGoals, awayTeamGoals);
  //   });
  // }

  // addGamesAndGoals(
  //   homeClub: ILeaderBoardTeam,
  //   awayClub: ILeaderBoardTeam,
  //   homeClubGoals: number,
  //   awayClubGoals: number,
  // ) {
  //   const updatedHomeClub = { ...homeClub };
  //   const updatedAwayClub = { ...awayClub };
  //   updatedHomeClub.totalGames += 1;
  //   updatedAwayClub.totalGames += 1;
  //   updatedHomeClub.goalsFavor += homeClubGoals;
  //   updatedHomeClub.goalsOwn += awayClubGoals;
  //   updatedAwayClub.goalsFavor += awayClubGoals;
  //   updatedAwayClub.goalsOwn += homeClubGoals;
  //   this.leaderBoard[this.leaderBoard.indexOf(homeClub)] = updatedHomeClub;
  //   this.leaderBoard[this.leaderBoard.indexOf(awayClub)] = updatedAwayClub;
  // }

  // resultMatch(
  //   homeClub: ILeaderBoardTeam,
  //   awayClub: ILeaderBoardTeam,
  //   homeClubGoals: number,
  //   awayClubGoals: number,
  // ) {
  //   const updatedHomeClub = { ...homeClub };
  //   const updatedAwayClub = { ...awayClub };
  //   if (homeClubGoals > awayClubGoals) {
  //     updatedHomeClub.totalVictories += 1;
  //     updatedAwayClub.totalLosses += 1;
  //   } else if (homeClubGoals === awayClubGoals) {
  //     updatedHomeClub.totalDraws += 1;
  //     updatedAwayClub.totalDraws += 1;
  //   } else {
  //     updatedHomeClub.totalLosses += 1;
  //     updatedAwayClub.totalVictories += 1;
  //   }
  //   this.leaderBoard[this.leaderBoard.indexOf(homeClub)] = updatedHomeClub;
  //   this.leaderBoard[this.leaderBoard.indexOf(awayClub)] = updatedAwayClub;
  // }
}

export default Leaderboard;
