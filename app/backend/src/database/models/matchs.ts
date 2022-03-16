import { DataTypes, Model } from 'sequelize';
import sequelize = require('sequelize');
import Clubs from './clubs';
import db from '.';

class Matchs extends Model {
}

Matchs.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
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
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },

}, {
  timestamps: false,
  underscored: true,
  sequelize: db,
  tableName: 'matchs',
});

Clubs.hasMany(Matchs, { foreignKey: 'home_team' });
Clubs.hasMany(Matchs, { foreignKey: 'away_team' });

Matchs.belongsTo(Clubs, { foreignKey: 'home_team' });
Matchs.belongsTo(Clubs, { foreignKey: 'away_team' });

export default Matchs;
