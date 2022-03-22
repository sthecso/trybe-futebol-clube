import { DataTypes, Model } from 'sequelize';
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
    allowNull: false,
  },
  homeTeam: {
    type: DataTypes.INTEGER,
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
  },
  awayTeam: {
    type: DataTypes.INTEGER,
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Match',
  tableName: 'matchs',
  timestamps: false,
});

Club.hasMany(Match, { foreignKey: 'homeTeam', as: 'homeMatchs' });
Club.hasMany(Match, { foreignKey: 'awayTeam', as: 'awayMatchs' });

Match.belongsTo(Club, { foreignKey: 'homeTeam', as: 'homeClub' });
Match.belongsTo(Club, { foreignKey: 'awayTeam', as: 'awayClub' });

export default Match;
