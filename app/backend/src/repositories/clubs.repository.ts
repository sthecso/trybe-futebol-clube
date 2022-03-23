import { ClubModel, MatchModel } from '../database/models';
import { IClubsRepository, IClub, IClubHistory } from '../interfaces';

export class ClubsRepository implements IClubsRepository {
  async getAllClubs(): Promise<IClub[]> {
    return (await ClubModel.findAll())
      .map((club) => club.get({ plain: true }));
  }

  async getClubById(id: string): Promise<IClub | undefined> {
    return (await ClubModel.findByPk(id))
      ?.get({ plain: true });
  }

  async getClubsHomeHistory(): Promise<IClubHistory[]> {
    return (await ClubModel.findAll({
      include: [{
        model: MatchModel,
        as: 'homeMatches',
        attributes: [['home_team_goals', 'goalsFavor'], ['away_team_goals', 'goalsOwn']],
        where: { inProgress: false },
      }],
    }))
      .map((clubHistory) => {
        const plainHistory = clubHistory.get({ plain: true });
        plainHistory.matches = [...plainHistory.homeMatches];
        delete plainHistory.homeMatches;
        return plainHistory;
      });
  }

  async getClubsAwayHistory(): Promise<IClubHistory[]> {
    return (await ClubModel.findAll({
      include: [{
        model: MatchModel,
        as: 'awayMatches',
        attributes: [['home_team_goals', 'goalsOwn'], ['away_team_goals', 'goalsFavor']],
        where: { inProgress: false },
      }],
    }))
      .map((clubHistory) => {
        const plainHistory = clubHistory.get({ plain: true });
        plainHistory.matches = [...plainHistory.awayMatches];
        return plainHistory;
      });
  }

  async getClubsOverallHistory(): Promise<IClubHistory[]> {
    return (await ClubModel.findAll({
      include: [{
        model: MatchModel,
        as: 'homeMatches',
        attributes: [['home_team_goals', 'goalsFavor'], ['away_team_goals', 'goalsOwn']],
        where: { inProgress: false },
      }, {
        model: MatchModel,
        as: 'awayMatches',
        attributes: [['home_team_goals', 'goalsOwn'], ['away_team_goals', 'goalsFavor']],
        where: { inProgress: false },
      }],
    }))
      .map((clubHistory) => {
        const plainHistory = clubHistory.get({ plain: true });
        plainHistory.matches = [...plainHistory.homeMatches, ...plainHistory.awayMatches];
        return plainHistory;
      });
  }
}
