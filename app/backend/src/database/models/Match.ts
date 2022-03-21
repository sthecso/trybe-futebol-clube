import { DataTypes, Model } from 'sequelize';
import db from '.';

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

export default Match;
