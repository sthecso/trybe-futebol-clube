import { Model, DataTypes } from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

class Matchs extends Model {
  public home_team_goals: number;

  public away_team_goals: number;

  public in_progress: number;
}

Matchs.init({
  home_team_goals: DataTypes.INTEGER,
  away_team_goals: DataTypes.INTEGER,
  in_progress: DataTypes.INTEGER,
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Matchs',
  timestamps: false,
});

export default Matchs;
