import Match from '../database/models/Match';
import Club from '../database/models/Club';
import {
  InProgressQ,
  IMatchScore,
  IMatchCreate,
  IMatch,
  IMatchComplete,
} from '../utils/interfaces';

class MatchRepository {
  public static async findAll(inProgressQ: InProgressQ) {
    const baseOptions = {
      include: [
        { model: Club, as: 'homeClub', attributes: ['clubName'] },
        { model: Club, as: 'awayClub', attributes: ['clubName'] },
      ],
    };

    const inProgress = inProgressQ === 'true';

    const options = inProgressQ !== undefined ? ({
      ...baseOptions,
      where: { inProgress },
    }) : baseOptions;

    const result = await Match.findAll(options);

    return result as unknown as IMatchComplete[];
  }

  public static async findById(id: IMatch['id']) {
    const result = await Match.findByPk(id, {
      include: [
        { model: Club, as: 'homeClub', attributes: ['clubName'] },
        { model: Club, as: 'awayClub', attributes: ['clubName'] },
      ],
    });

    return result as unknown as IMatchComplete;
  }

  public static async create(newMatch: IMatchCreate) {
    const result = await Match.create({
      ...newMatch,
      inProgress: true,
    });

    return result as unknown as IMatch;
  }

  public static async finish(matchId: IMatch['id']) {
    const [affectedRows] = await Match.update(
      { inProgress: false },
      { where: { id: matchId.toString() } },
    );

    return affectedRows !== 0;
  }

  public static async edit(
    matchId: IMatch['id'],
    updatedScore: IMatchScore,
  ) {
    const [affectedRows] = await Match.update(
      updatedScore, // values = { homeTeamGoals, awayTeamGoals }
      { where: { id: matchId.toString(), inProgress: true } },
    );

    return affectedRows !== 0;
  }
}

export default MatchRepository;
