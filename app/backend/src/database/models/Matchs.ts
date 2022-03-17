import { DataTypes, Model } from 'sequelize';
import db from '.';
import Clubs from './Clubs';

class Matchs extends Model {
  public id: number;

  public homeTeam: number;

  public awayTeam: number;

  public homeTeamGoals: number;

  public awayTeamGoals: number;

  public inProgress: boolean;
}

Matchs.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  homeTeam: {
    type: DataTypes.INTEGER,
  },
  awayTeam: {
    type: DataTypes.INTEGER,
  },
  homeTeamGoals: {
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
  timestamps: false,
  modelName: 'Matchs',
  tableName: 'matchs',
});

Clubs.hasMany(Matchs, {
  foreignKey: 'homeTeam',
});

Clubs.hasMany(Matchs, {
  foreignKey: 'awayTeam',
});

Matchs.belongsTo(Clubs, {
  foreignKey: 'homeTeam',
  as: 'homeClub',
});

Matchs.belongsTo(Clubs, {
  foreignKey: 'awayTeam',
  as: 'awayClub',
});

export default Matchs;
