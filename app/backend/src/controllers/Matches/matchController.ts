/* eslint-disable max-lines-per-function */
import { Response, NextFunction } from 'express';

import StatusCode from '../../enums';
import Match from '../../database/models/Matchs';
import Club from '../../database/models/Club';
import { CustomRequest, IMatch } from '../../interfaces';

const EMPTY_DB = 'no match registered yet';
const MATCH_NOT_FOUND = 'match not found';
const EQUAL_TEAMS = 'It is not possible to create a match with two equal teams';
const TEAM_NOT_FOUND = 'There is no team with such id!';
// const MATCH_SAVED = 'Finished match';
// const MATCH_UPDATED = 'Updated match';

export default class MatchController {
  static async getMatches(
    req: CustomRequest<string>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { inProgress } = req.query;
      if (!inProgress) {
        const matches = await Match.findAll({
          include: [
            { model: Club, as: 'homeClub', attributes: ['clubName'] },
            { model: Club, as: 'awayClub', attributes: ['clubName'] },
          ],
        });
        if (!matches) return res.status(StatusCode.NOT_FOUND).json({ message: EMPTY_DB });
        return res.status(StatusCode.OK).json(matches);
      }
      const value = inProgress === 'true' ? 1 : 0;
      const matches = await Match.findAll({
        where: { inProgress: value },
        include: [
          { model: Club, as: 'homeClub', attributes: ['clubName'] },
          { model: Club, as: 'awayClub', attributes: ['clubName'] },
        ],
      });
      if (!matches) return res.status(StatusCode.NOT_FOUND).json({ message: MATCH_NOT_FOUND });
      return res.status(StatusCode.OK).json(matches);
    } catch (err) {
      next(err);
    }
  }

  static async saveMatch(
    req: CustomRequest<IMatch>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;
      if (homeTeam === awayTeam) {
        return res.status(StatusCode.UNAUTHORIZED).json({ message: EQUAL_TEAMS });
      }
      const allTeams = await Club.findAll({ raw: true });
      const existing = allTeams.filter(({ id }) => id === homeTeam || id === awayTeam);
      console.log(existing);
      if (existing.length < 2) {
        return res.status(StatusCode.UNAUTHORIZED).json({ message: TEAM_NOT_FOUND });
      }
      const newMatch = await Match.create({
        homeTeam,
        awayTeam,
        homeTeamGoals,
        awayTeamGoals,
        inProgress,
      });

      res.status(StatusCode.CREATED).json(newMatch);
    } catch (err) {
      next(err);
    }
  }

  static async updateFinishedMatch(
    req: CustomRequest<string>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;
      const updated = await Match.update(
        { inProgress: false },
        { where: { id } },
      );
      console.log(updated);
      return res.status(StatusCode.OK).end();
    } catch (err) {
      next(err);
    }
  }

  static async updateInProgressMatch(
    req: CustomRequest<IMatch>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;
      const { homeTeamGoals, awayTeamGoals } = req.body;
      const updated = await Match.update(
        {
          homeTeamGoals,
          awayTeamGoals,
        },
        { where: { id } },
      );
      return res.status(StatusCode.OK).json(updated);
    } catch (err) {
      next(err);
    }
  }
}
