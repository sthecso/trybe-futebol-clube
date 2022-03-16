import { DataTypes, Model } from 'sequelize';
import db from '.';

class Match extends Model {
  public homeTeam: string;

  public homeTeamGoals: number;

  public awayTeam: string;

  public awayTeamGoals: number;

  public inProgress: boolean;
}
Match.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  home_team: DataTypes.STRING,
  home_team_goals: DataTypes.INTEGER,
  away_team: DataTypes.STRING,
  away_team_goals: DataTypes.INTEGER,
  in_progress: DataTypes.BOOLEAN,
}, {
  sequelize: db,
  underscored: true,
  modelName: 'Match',
  timestamps: false,
});

export default Match;
