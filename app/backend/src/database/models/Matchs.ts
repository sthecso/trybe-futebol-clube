import { DataTypes, Model } from 'sequelize';
import db from '.';

class Matchs extends Model {
  public id: number;

  public homeTeam: number;

  public awayTeam: number;

  public homeTeamGoals: number;

  public awayTeamGoals: number;

  public inProgress: boolean;
}

Matchs.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  homeTeam: {
    type: DataTypes.INTEGER,
  },
  awayTeam: {
    type: DataTypes.INTEGER,
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
  },
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
  modelName: 'Matchs',
  tableName: 'matchs',
});

export default Matchs;
