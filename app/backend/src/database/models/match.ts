import { Model, DataTypes } from 'sequelize';
import db from '.';

class Match extends Model {
  public id: number;

  public home_team: number;

  public home_team_goals: number;

  public away_team: number;

  public away_team_goals: number;

  public in_progress: number;
}

Match.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  home_team: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  home_team_goals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  away_team: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  away_team_goals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  in_progress: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'Match',
});

export default Match;
