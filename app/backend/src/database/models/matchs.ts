import { DataTypes, Model } from 'sequelize';
import db from '.';
import Clubs from './clubs';

class Matchs extends Model {
  public id: number;

  public homeTeam: number;

  public homeTeamGoals: number;

  public awayTeam: number;

  public awayTeamGoals: number;

  public inProgress: number;
}

Matchs.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  homeTeam: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeam: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize: db,
  timestamps: false,
  underscored: true,
  tableName: 'matchs',
});

Clubs.belongsTo(Matchs, { foreignKey: 'homeTeam', as: 'homeMatch' });
Clubs.belongsTo(Matchs, { foreignKey: 'awayTeam', as: 'awayMatch' });

Matchs.hasMany(Clubs, { foreignKey: 'homeTeam', as: 'homeTeam' });
Matchs.hasMany(Clubs, { foreignKey: 'awayTeam', as: 'awayTeam' });

export default Matchs;
