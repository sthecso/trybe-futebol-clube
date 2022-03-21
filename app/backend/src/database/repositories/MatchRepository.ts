import { WhereOptions } from 'sequelize';

import Match from '../models/Matchs';

import { IOptionsRepository } from './interfaces';

import { IMatchPostRequest, IMatchResponse } from '../../interfaces/match';

interface IMatchOptions {
  id?: number;
  homeTeam?: number;
  awayTeam?: number;
  homeTeamGoals?: number;
  awayTeamGoals?: number;
  inProgress?: boolean;
}

class MatchRepository {
  private Match = Match;

  async findAll(
    options?: IOptionsRepository<IMatchOptions>,
  ): Promise<IMatchResponse[]> {
    let matches;

    if (options) {
      let where = {};
      let include;
      if (options.where) where = options.where;
      if (options.include) include = options.include;

      matches = await this.Match.findAll({ where, include });
    } else matches = await this.Match.findAll();

    const justDataValuesOfMatch = matches.map((match) => (
      match.get({ plain: true })
    ));

    return justDataValuesOfMatch as IMatchResponse[];
  }

  async findOne(
    options?: IOptionsRepository<IMatchOptions>,
  ): Promise<IMatchResponse> {
    let match;

    if (options) {
      let where = {};
      let include;
      if (options.where) where = options.where;
      if (options.include) include = options.include;

      match = await this.Match.findOne({ where, include });
    } else match = await this.Match.findOne();

    const justDataValuesOfMatch = match?.get({ plain: true }) as IMatchResponse;

    return justDataValuesOfMatch;
  }

  async createOne(
    matchData: IMatchPostRequest,
  ): Promise<IMatchResponse> {
    const createdMatch = await this.Match.create(matchData);

    const justDataValuesOfMatch = createdMatch.get({ plain: true }) as IMatchResponse;

    return justDataValuesOfMatch;
  }

  async updateOne(
    matchData: IMatchOptions,
    { where }: { where: WhereOptions<IMatchResponse> },
  ) {
    await this.Match.update({ ...matchData }, { where });
  }
}

export default MatchRepository;
