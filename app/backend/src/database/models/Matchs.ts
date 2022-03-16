import { DataTypes, Model } from 'sequelize';
import db from '.';
import Clubs from './Clubs';

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

Clubs.belongsTo(Matchs, { foreignKey: 'homeTeam', as: 'match' });
Clubs.belongsTo(Matchs, { foreignKey: 'awayTeam', as: 'match' });
Matchs.hasMany(Clubs, { foreignKey: 'awayTeam', as: 'match' });
Matchs.hasMany(Clubs, { foreignKey: 'homeTeam', as: 'match' });

export default Matchs;
