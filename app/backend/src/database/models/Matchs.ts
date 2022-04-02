import { DataTypes, Model } from 'sequelize';
import db from '.';
import Clubs from './Clubs';

class Matchs extends Model {
  public id: number;

  public homeTeam: number;

  public homeTeamGoals: number;

  public awayTeam: number;

  public awayTeamGoals: number;

  public inProgress: boolean;
}

Matchs.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
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
  underscored: true,
  sequelize: db,
  modelName: 'Matchs',
  timestamps: false,
});

Clubs.hasMany(Matchs, { foreignKey: 'homeTeam', as: 'homeClub' });
Clubs.hasMany(Matchs, { foreignKey: 'awayTeam', as: 'awayClub' });

Matchs.belongsTo(Clubs, { foreignKey: 'homeTeam', as: 'homeTeamMatches' });
Matchs.belongsTo(Clubs, { foreignKey: 'awayTeam', as: 'awayTeamMatches' });

export default Matchs;
