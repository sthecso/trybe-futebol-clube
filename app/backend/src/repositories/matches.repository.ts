import { IMatchesRepository, INewMatch, IScore, IMatch, INewMatchResponse } from '../interfaces';
import { MatchModel, ClubModel } from '../database/models';

export class MatchesRepository implements IMatchesRepository {
  async getAllInProgressMatches(): Promise<IMatch[]> {
    return (await MatchModel.findAll({
      where: { inProgress: true },
      include: [
        { model: ClubModel, as: 'homeClub', attributes: ['clubName'] },
        { model: ClubModel, as: 'awayClub', attributes: ['clubName'] },
      ],
    }))
      .map((match) => match.get({ plain: true }));
  }

  async getAllFinishedMatches(): Promise<IMatch[]> {
    return (await MatchModel.findAll({
      where: { inProgress: false },
      include: [
        { model: ClubModel, as: 'homeClub', attributes: ['clubName'] },
        { model: ClubModel, as: 'awayClub', attributes: ['clubName'] },
      ],
    }))
      .map((match) => match.get({ plain: true }));
  }

  async getAllMatches(): Promise<IMatch[]> {
    return (await MatchModel.findAll({
      include: [
        { model: ClubModel, as: 'homeClub', attributes: ['clubName'] },
        { model: ClubModel, as: 'awayClub', attributes: ['clubName'] },
      ],
    }))
      .map((match) => match.get({ plain: true }));
  }

  async getMatchById(id: string): Promise<IMatch> {
    return (await MatchModel.findByPk(id, {
      include: [
        { model: ClubModel, as: 'homeClub', attributes: ['clubName'] },
        { model: ClubModel, as: 'awayClub', attributes: ['clubName'] },
      ],
    }))
      ?.get({ plain: true });
  }

  async saveMatch(data: INewMatch): Promise<INewMatchResponse> {
    return (await MatchModel.create(data))
      .get({ plain: true });
  }

  async finishMatch(id: string): Promise<number> {
    const [status] = await MatchModel.update({ inProgress: false }, { where: { id } });
    return status;
  }

  async updateScore(id: string, newScore: IScore): Promise<number> {
    const [status] = await MatchModel.update(newScore, { where: { id, inProgress: true } });
    return status;
  }
}
