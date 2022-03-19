import { DataTypes, Model } from 'sequelize';

import db from '.';
import Club from './Clubs';

interface MatchParams {
  id: number,
  home_team: number,
  home_team_goals: number,
  away_team: number,
  away_team_goals: number,
  in_progress: number,
};

class Match extends Model<MatchParams> {
  public id: number;

  public home_team: number;

  public home_team_goals: number;

  public away_team: number;

  public away_team_goals: number;

  public in_progress: boolean;
}

Match.init({
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
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'Match',
  tableName: 'matchs',
  timestamps: false,
});

Match.belongsTo(Club, { foreignKey: 'home_team', as: 'homeClub' });
Match.belongsTo(Club, { foreignKey: 'away_team', as: 'awayClub' });

Club.hasMany(Match, { foreignKey: 'home_team', as: 'homeMatch' });
Club.hasMany(Match, { foreignKey: 'away_team', as: 'awayMatch' });

export default Match;