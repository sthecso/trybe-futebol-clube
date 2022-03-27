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
  underscored: true,
  sequelize: db,
  modelName: 'Matchs',
  timestamps: false,
});

Clubs.belongsTo(Matchs, { foreignKey: 'home_team', as: 'homeTeam' });
Clubs.belongsTo(Matchs, { foreignKey: 'away_team', as: 'awayTeam' });

Matchs.hasMany(Clubs, { foreignKey: 'home_team', as: 'homeTeam' });
Matchs.hasMany(Clubs, { foreignKey: 'away_team', as: 'awayTeam' });

export default Matchs;
