import {
  IClubWithAwayMatches,
  IClubWithHomeMatches,
  IMatchGoals,
} from '../interfaces/IClub';
import Club from '../database/models/Club';
import Match from '../database/models/Match';
import sortClubs from '../helpers/sortClubs';
import ClubStats from '../helpers/ClubStats';

class LeaderboardService {
  private ClubModel = Club;

  private victoryPoints = 3;

  generateStats(matches: IMatchGoals[], clubName: string) {
    const stats = new ClubStats(clubName, matches.length);
    matches.forEach(({ dataValues: { goalsFavor, goalsOwn } }) => {
      stats.goalsFavor += goalsFavor;
      stats.goalsOwn += goalsOwn;
      if (goalsFavor > goalsOwn) stats.totalVictories += 1;
      else if (goalsFavor < goalsOwn) stats.totalLosses += 1;
      else stats.totalDraws += 1;
    });

    stats.totalPoints = stats.totalVictories * this.victoryPoints + stats.totalDraws;
    stats.efficiency = +((stats.totalPoints / (stats.totalGames * 3)) * 100).toFixed(2);
    stats.goalsBalance = stats.goalsFavor - stats.goalsOwn;
    return stats;
  }

  async getHomeMatchs() {
    const clubs = (await this.ClubModel.findAll({
      include: {
        model: Match,
        as: 'homeMatchs',
        where: { inProgress: false },
        attributes: [
          ['home_team_goals', 'goalsFavor'],
          ['away_team_goals', 'goalsOwn'],
        ],
      },
    })) as unknown as IClubWithHomeMatches[];

    const board = clubs.map((club) => this.generateStats(club.homeMatchs, club.clubName));
    sortClubs(board);
    return board;
  }

  async getAwayMatchs() {
    const clubs = (await this.ClubModel.findAll({
      include: {
        model: Match,
        as: 'awayMatchs',
        where: { inProgress: false },
        attributes: [
          ['home_team_goals', 'goalsOwn'],
          ['away_team_goals', 'goalsFavor'],
        ],
      },
    })) as unknown as IClubWithAwayMatches[];

    const board = clubs.map((club) => this.generateStats(club.awayMatchs, club.clubName));
    sortClubs(board);
    return board;
  }

  generateAllGamesStats(clubStats: ClubStats, otherStats: ClubStats) {
    const stats = new ClubStats(clubStats.name, 0);
    stats.totalGames = clubStats.totalGames + otherStats.totalGames;
    stats.totalVictories = clubStats.totalVictories + otherStats.totalVictories;
    stats.totalLosses = clubStats.totalLosses + otherStats.totalLosses;
    stats.totalDraws = clubStats.totalDraws + otherStats.totalDraws;
    stats.goalsFavor = clubStats.goalsFavor + otherStats.goalsFavor;
    stats.goalsOwn = clubStats.goalsOwn + otherStats.goalsOwn;
    stats.totalPoints = stats.totalVictories * this.victoryPoints + stats.totalDraws;
    stats.goalsBalance = stats.goalsFavor - stats.goalsOwn;
    stats.efficiency = +((stats.totalPoints / (stats.totalGames * 3)) * 100).toFixed(2);
    return stats;
  }

  async getAllMatchs() {
    const awayBoard = await this.getAwayMatchs();
    const homeBoard = await this.getHomeMatchs();

    let mainBoard = awayBoard; // default main leaderboard
    let secondaryBoard = homeBoard; // default secondary leaderboard

    if (homeBoard.length > awayBoard.length) { // verify if the other board has more data
      mainBoard = homeBoard;
      secondaryBoard = awayBoard;
    }

    const newBoard = mainBoard.map((clubStats) => {
      const otherStats = secondaryBoard.find((club) => clubStats.name === club.name);
      if (!otherStats) return clubStats; // if club has no data in the other board, return the main board
      const newStats = this.generateAllGamesStats(clubStats, otherStats);
      return newStats;
    });

    sortClubs(newBoard);
    return newBoard;
  }
}

export default LeaderboardService;
