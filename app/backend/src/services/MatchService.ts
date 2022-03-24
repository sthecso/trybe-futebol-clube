import { ICreatedMatch, IMatch, IMatchWithClubs, updateMatch } from '../interfaces/IMatch';
import Match from '../database/models/Match';
import Club from '../database/models/Club';
import ClubService from './ClubService';
import APIError from '../helpers/APIError';

class MatchService {
  private MatchModel = Match;

  private ClubService: ClubService;

  constructor() {
    this.ClubService = new ClubService();
  }

  async getAll(inProgress: undefined | string) {
    const findOptions = { include: [
      { model: Club, as: 'homeClub', attributes: { exclude: ['id'] } },
      { model: Club, as: 'awayClub', attributes: { exclude: ['id'] } },
    ] };

    if (inProgress === 'true' || inProgress === 'false') {
      const boolInPogress = (inProgress === 'true');

      const matches = (await this.MatchModel.findAll(
        { where: { inProgress: boolInPogress }, ...findOptions },
      )) as unknown as IMatchWithClubs[];
      return matches;
    }

    const matches = (await this.MatchModel.findAll(findOptions)) as unknown as IMatchWithClubs[];
    return matches;
  }

  async create(matchDetails: IMatch) {
    const { homeTeam, awayTeam } = matchDetails;

    if (homeTeam === awayTeam) {
      const error = new APIError('It is not possible to create a match with two equal teams', 'unauthorized');
      throw error;
    }

    const homeClub = await this.ClubService.getById(homeTeam);
    const awayClub = await this.ClubService.getById(awayTeam);

    if (!homeClub || !awayClub) {
      const error = new APIError('There is no team with such id!', 'unauthorized');
      throw error;
    }

    const newMatch = await this.MatchModel.create(matchDetails);
    return newMatch;
  }

  async update(updatedDetails: updateMatch, id: number) {
    const match = await this.MatchModel.findByPk(id);

    if (!match) {
      throw new APIError('There is no team with such id!', 'unauthorized');
    }

    const updatedMatch = await this.MatchModel.update(updatedDetails, {
      where: { id },
    });
    return updatedMatch;
  }

  async finishMatch(id: number) {
    const match = await this.MatchModel.findByPk(id);
    if (!match) {
      const error = new APIError('There is no match with such id!', 'unauthorized');
      throw error;
    }

    await this.MatchModel.update({ inProgress: false }, { where: { id } });
  }
}

export default MatchService;
