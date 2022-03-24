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
}

export default LeaderboardService;
