import { DataTypes, Model } from 'sequelize';
import db from '.';
import Club from './Club';

class Match extends Model {
  public id: number;

  public homeTeam: string;

  public homeTeamGoals: number;

  public awayTeam: string;

  public awayTeamGoals: number;

  public inProgress: boolean;
}
Match.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  homeTeam: DataTypes.INTEGER,
  homeTeamGoals: DataTypes.INTEGER,
  awayTeam: DataTypes.INTEGER,
  awayTeamGoals: DataTypes.INTEGER,
  inProgress: DataTypes.BOOLEAN,
}, {
  sequelize: db,
  underscored: true,
  timestamps: false,
  modelName: 'Match',
  tableName: 'matchs',
});

Club.hasMany(Match, { foreignKey: 'homeTeam', as: 'homeMatchs' });
Club.hasMany(Match, { foreignKey: 'awayTeam', as: 'awayMatchs' });

Match.belongsTo(Club, { foreignKey: 'homeTeam', as: 'homeClub' });
Match.belongsTo(Club, { foreignKey: 'awayTeam', as: 'awayClub' });

export default Match;
