import { DataTypes, Model } from 'sequelize';
import db from '.';

class Matchs extends Model {}

Matchs.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
  },
  home_team: {
    type: DataTypes.STRING,
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
  modelName: 'Matchs',
});

export default Matchs;
