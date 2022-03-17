import { DataTypes, Model } from 'sequelize';
import db from '.';
import Club from './Club';

export default class Match extends Model {}

Match.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  home_team: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  away_team: {
    type: DataTypes.INTEGER,
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
  modelName: 'matchs', // We need to choose the model name
});

Match.hasMany(Club, { foreignKey: 'home_team', as: 'home' });
Match.hasMany(Club, { foreignKey: 'away_team', as: 'away' });

Club.belongsTo(Match, { foreignKey: 'home_team', as: 'home' });
Club.belongsTo(Match, { foreignKey: 'away_team', as: 'away' });
