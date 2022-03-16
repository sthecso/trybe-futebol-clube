import { Model, DataTypes } from 'sequelize';
import db from '.';

class Match extends Model {
  public home_team: number;

  public home_team_goals: number;

  public away_team: number;

  public away_team_goals: number;

  public in_progress: number;
}

Match.init({
  home_team: DataTypes.INTEGER,
  home_team_goals: DataTypes.INTEGER,
  away_team: DataTypes.INTEGER,
  away_team_goals: DataTypes.INTEGER,
  in_progress: DataTypes.INTEGER,
}, {
  sequelize: db,
  modelName: 'Match',
});

export default Match;
