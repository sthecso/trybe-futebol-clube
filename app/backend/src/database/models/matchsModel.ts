import { Model, DataTypes } from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

class Matchs extends Model {
  public homeTeamGoals: number;

  public awayTeamGoals: number;

  public inProgress: number;
}

Matchs.init({
  home_team_goals: {
    type: DataTypes.INTEGER,
    field: 'home_team_goals',
  },
  away_team_goals: {
    type: DataTypes.INTEGER,
    field: 'away_team_goals',
  },
  in_progress: {
    type: DataTypes.INTEGER,
    field: 'in_progress',
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matchs',
  timestamps: false,
});

export default Matchs;
