import { DataTypes, Model } from 'sequelize';
import db from '.';

class Match extends Model {}

Match.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  home_team: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  away_team: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  home_team_goals: {
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
  // Other model options go here
  timestamps: false,
  sequelize: db, // We need to pass the connection instance
  modelName: 'Match', // We need to choose the model name
});
