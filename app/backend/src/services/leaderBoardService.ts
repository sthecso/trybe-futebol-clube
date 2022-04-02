import { IMatchesTeam, IMatchWithId } from '../interfaces/IMatchs';
import Clubs from '../database/models/Clubs';
import Matchs from '../database/models/Matchs';

class LeaderBoardService {
  private _ClubsModel = Clubs;

  public _MatchsModel = Matchs;

  public totalPoints:number;

  public totalGames:number;

  public totalVictories: number;

  public totalDraws: number;

  public totalLosses: number;

  public goalsFavor: number;

  public goalsOwn: number;

  public goalsBalance: number;

  public efficiency: number;

  constructor() {
    this.totalPoints = 0;
    this.totalGames = 0;
    this.totalVictories = 0;
    this.totalDraws = 0;
    this.totalLosses = 0;
    this.goalsFavor = 0;
    this.goalsOwn = 0;
    this.goalsBalance = 0;
    this.efficiency = 0;
  }

  public structure = async () => {
    const matches = await this._ClubsModel.findAll({
      include: [{
        model: Matchs,
        as: 'homeClub',
        where: {
          inProgress: false,
        },
      }],
    }) as unknown as IMatchesTeam[];

    return this.orderMatches(matches);
  };

  public orderMatches = (matches: IMatchesTeam[]) => {
    const ordering = matches.map((c: IMatchesTeam) => {
      const order = {
        name: c.clubName,
        totalPoints: this.totalPoints,
        totalGames: this.totalGames,
        totalVictories: this.totalVictories,
        totalDraws: this.totalDraws,
        totalLosses: this.totalLosses,
        goalsFavor: this.goalsFavor,
        goalsOwn: this.goalsOwn,
        goalsBalance: this.goalsBalance,
        efficiency: this.efficiency,
      };
      return order;
    });
    return ordering;
  };

  public callMethods = async (matches: IMatchesTeam[]) => {
    const homeClub = matches.flatMap((c: IMatchesTeam) => c.homeClub);
    console.log(homeClub);
    this.orderTotalPoints(homeClub);
    this.orderTotalGames(matches);
    this.orderTotalLosses(homeClub);
    this.orderTotalVictories(homeClub);
    this.orderTotalDraws(homeClub);
    this.orderTotalGoalsOwn(homeClub);
    this.orderTotalGoalsBalance();
    this.orderEfficiency();
  };

  public orderTotalPoints = async (homeClub: IMatchWithId[]) => {
    const sumPoints = homeClub.map((m) => {
      let result = 0;
      if (m.homeTeamGoals > m.awayTeamGoals) {
        result = 3;
      }
      if (m.homeTeamGoals === m.awayTeamGoals) {
        result = 1;
      }
      return result;
    }).reduce((acc: number, curr: number) => acc + curr, 0);
    this.totalPoints += sumPoints;
    return sumPoints;
  };

  public orderTotalGames = async (matches: IMatchesTeam[]) => {
    const countGames = matches.filter((c: IMatchesTeam) => c.clubName);
    this.totalGames += countGames.length;
    return countGames;
  };

  public orderTotalVictories = async (homeClub: IMatchWithId[]) => {
    const countVictories = homeClub.map((c) => {
      let result = 0;
      if (c.homeTeamGoals > c.awayTeamGoals) {
        result = 1;
      }
      return result;
    }).reduce((acc: number, curr: number) => acc + curr, 0);
    return countVictories;
  };

  public orderTotalDraws = async (homeClub: IMatchWithId[]) => {
    const countDraws = homeClub.map((c) => {
      let result = 0;
      if (c.homeTeamGoals === c.awayTeamGoals) {
        result = 1;
      }
      return result;
    }).reduce((acc, curr) => acc + curr, 0);
    return countDraws;
  };

  public orderTotalLosses = async (homeClub: IMatchWithId[]) => {
    const countTotalLosses = homeClub.map((c) => {
      let result = 0;
      if (c.homeTeamGoals < c.awayTeamGoals) {
        result = 1;
      }
      return result;
    }).reduce((acc, curr) => acc + curr, 0);
    return countTotalLosses;
  };

  public orderTotalFavor = async (homeClub: IMatchWithId[]) => {
    const countGoals = homeClub.map((c) =>
      c.homeTeamGoals)
      .reduce((acc:number, curr:number) => acc + curr, 0);
    this.totalPoints += countGoals;
    return countGoals;
  };

  public orderTotalGoalsOwn = async (homeClub: IMatchWithId[]) => {
    const goalsOwn = homeClub.map((c) =>
      c.awayTeamGoals)
      .reduce((acc, curr) => acc + curr, 0);
    this.goalsOwn += goalsOwn;
    return goalsOwn;
  };

  public orderTotalGoalsBalance = async () => {
    const goalsBalance = Number(this.totalPoints) - Number(this.goalsOwn);
    return goalsBalance;
  };

  public orderEfficiency = async () => {
    const total = Number(this.totalPoints);
    const games = Number(this.totalGames);
    const performanceTeam = Number(((total / (games * 3)) * 100).toFixed(2));
    return performanceTeam;
  };

  public async tieBreaker() {
    const structure = await this.structure();
    structure.sort((a, b) => {
      if (a.goalsOwn === b.goalsOwn) return 0;
      return a.goalsOwn > b.goalsOwn ? 1 : -1;
    })
      .sort((a, b) => {
        if (a.goalsFavor === b.goalsFavor) return 0;
        return a.goalsFavor > b.goalsFavor ? -1 : 1;
      })
      .sort((a, b) => {
        if (a.goalsBalance === b.goalsBalance) return 0;
        return a.goalsBalance > b.goalsBalance ? -1 : 1;
      })
      .sort((a, b) => {
        if (a.totalVictories === b.totalVictories) return 0;
        return a.totalVictories > b.totalVictories ? -1 : 1;
      });
    return structure;
  }

  public async leaderboardSorted() {
    const leaderboard = await this.tieBreaker();
    leaderboard.sort((a, b) => {
      if (a.totalPoints === b.totalPoints) return 0;
      return a.totalPoints > b.totalPoints ? -1 : 1;
    });
    return leaderboard;
  }
}

export default new LeaderBoardService();
