import { DataTypes, Model } from 'sequelize';
import db from '.';
import Club from './ClubModel';

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
    allowNull: false,
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
    defaultValue: 0,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Match',
  tableName: 'matchs',
  timestamps: false,
});

Club.hasMany(Match, {
  foreignKey: 'homeTeam', as: 'homeMatchs',
});

Club.hasMany(Match, {
  foreignKey: 'awayTeam', as: 'awayMatchs',
});

Match.belongsTo(Club, {
  foreignKey: 'homeTeam', as: 'homeClub',
});

Match.belongsTo(Club, {
  foreignKey: 'awayTeam', as: 'awayClub',
});

export default Match;
