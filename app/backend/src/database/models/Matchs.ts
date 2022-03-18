import { DataTypes, Model } from 'sequelize';
import db from '.';
import Clubs from './Clubs';

class Matchs extends Model { }

Matchs.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
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
    defaultValue: 0,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Matchs',
  timestamps: false,
});

Clubs.belongsTo(Matchs, { foreignKey: 'home_team', as: 'timeDaCasa' });
Clubs.belongsTo(Matchs, { foreignKey: 'away_team', as: 'timeVisitante' });

Matchs.hasMany(Clubs, { foreignKey: 'home_team', as: 'golsTimeDaCasa' });
Matchs.hasMany(Clubs, { foreignKey: 'away_team', as: 'golsTimeVisitante' });

export default Matchs;
