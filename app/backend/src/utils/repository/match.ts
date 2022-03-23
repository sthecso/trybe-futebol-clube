import { ClubModel, MatchModel } from '../../database/models';
import {
  IMatch,
  IMatchResponse,
  INewMatch,
  IScore,
} from '../interfaces';

export default class MatchesRepository {
  static async getAllInProgress(): Promise<IMatch[]> {
    return (
      await MatchModel.findAll({
        where: { inProgress: true },
        include: [
          { model: ClubModel, as: 'homeClub', attributes: ['clubName'] },
          { model: ClubModel, as: 'awayClub', attributes: ['clubName'] },
        ],
      })
    ).map((match) => match.get({ plain: true }));
  }

  static async getAllFinished(): Promise<IMatch[]> {
    return (
      await MatchModel.findAll({
        where: { inProgress: false },
        include: [
          { model: ClubModel, as: 'homeClub', attributes: ['clubName'] },
          { model: ClubModel, as: 'awayClub', attributes: ['clubName'] },
        ],
      })
    ).map((match) => match.get({ plain: true }));
  }

  static async getAll(): Promise<IMatch[]> {
    return (
      await MatchModel.findAll({
        include: [
          { model: ClubModel, as: 'homeClub', attributes: ['clubName'] },
          { model: ClubModel, as: 'awayClub', attributes: ['clubName'] },
        ],
      })
    ).map((match) => match.get({ plain: true }));
  }

  static async getById(id: string): Promise<IMatch> {
    return (
      await MatchModel.findByPk(id, {
        include: [
          { model: ClubModel, as: 'homeClub', attributes: ['clubName'] },
          { model: ClubModel, as: 'awayClub', attributes: ['clubName'] },
        ],
      })
    )?.get({ plain: true });
  }

  static async addMatch(data: INewMatch): Promise<IMatchResponse> {
    return (await MatchModel.create(data)).get({ plain: true });
  }

  static async finishMatch(id: string): Promise<number> {
    const [status] = await MatchModel.update(
      { inProgress: false },
      { where: { id } },
    );
    return status;
  }

  static async updateMatchScore(id: string, newScore: IScore): Promise<number> {
    const [status] = await MatchModel.update(newScore, {
      where: { id, inProgress: true },
    });
    return status;
  }
}
