import { Model, DataTypes } from 'sequelize';
import db from '.';

import Club from './Club';

class Match extends Model {
  public id: number;

  public homeTeam: number;

  public homeTeamGoals: number;

  public awayTeam: number;

  public awayTeamGoals: number;

  public inProgress: boolean;
}

Match.init({
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
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Match',
  tableName: 'matchs',
  timestamps: false,
});

Club.hasMany(Match, {
  foreignKey: 'home_team',
  as: 'home_match',
});
Club.hasMany(Match, {
  foreignKey: 'away_team',
  as: 'away_match',
});

Match.belongsTo(Club, {
  foreignKey: 'home_team',
  as: 'home_club',
});
Match.belongsTo(Club, {
  foreignKey: 'away_team',
  as: 'away_club',
});

export default Match;
