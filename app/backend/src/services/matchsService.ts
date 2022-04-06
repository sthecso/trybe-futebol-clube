import { ParsedQs } from 'qs';
import HttpException from '../utils/HttpException';
import Clubs from '../database/models/Clubs';
import Matchs from '../database/models/Matchs';
import { IMatch } from '../interfaces/IMatchs';
import clubsService from './clubsService';

class MatchsService {
  private _MatchsModel = Matchs;

  private clubsService = clubsService;

  private UNAUTHORIZED = new HttpException(
    401,
    'It is not possible to create a match with two equal teams',
  );

  private CLUB_NOT_EXIST = new HttpException(
    401,
    'There is no team with such id!',
  );

  public getAll = async () => {
    const matchs = await this._MatchsModel.findAll({
      include: [{
        model: Clubs,
        as: 'homeClub',
        all: true,
        attributes: ['clubName'],
      }],
    });
    return matchs;
  };

  public getByFalseProgress = async () => {
    const matchs = await this._MatchsModel.findAll({
      where: {
        inProgress: false,
      },
      include: [{
        model: Clubs,
        as: 'homeTeamMatches',
        all: true,
        attributes: ['clubName'],
      }],
    });
    return matchs;
  };

  public getByProgress = async (
    inProgress: string | ParsedQs | string[] | ParsedQs[] | undefined,
  ) => {
    const query = await JSON.parse(await JSON.parse(await JSON.stringify(inProgress)));
    const match = await this._MatchsModel.findAll({
      where: {
        inProgress: query,
      },
      include: [{
        model: Clubs,
        as: 'homeClub',
        all: true,
        attributes: ['clubName'],
      }],
    });
    return match;
  };

  public createMatch = async (body: IMatch) => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = body;
    const { clubName: homeSquad } = await this.clubsService.getById(homeTeam);
    const { clubName: visitingTeam } = await this.clubsService.getById(awayTeam);

    if (homeTeam === awayTeam) throw this.UNAUTHORIZED;
    if (!homeSquad || !visitingTeam) throw this.CLUB_NOT_EXIST;

    const matchCreated = await this._MatchsModel.create({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress,
    });
    return matchCreated;
  };

  public updateInProgress = async (id: string) => {
    await this._MatchsModel.update({ inProgress: false }, { where: { id } });
    const updatedMatch = await this._MatchsModel.findByPk(id);
    return updatedMatch;
  };

  public updateGoals = async (homeSquadGoals?: string, visitingTeamGoals?: string, id?: string) => {
    await this._MatchsModel.update({
      homeTeamGoals: homeSquadGoals,
      awayTeamGoals: visitingTeamGoals,
    }, { where: { id } });
    const updatedMatch = await this._MatchsModel.findByPk(id);
    return updatedMatch;
  };
}

export default new MatchsService();
