import { DataTypes, Model } from 'sequelize';
import db from '.';
import Clubs from './Club';

class Matchs extends Model {
  declare id: number;

  declare homeTeam: number;

  declare homeTeamGoals: number;

  declare awayTeam: number;

  declare inProgress: boolean;
}

Matchs.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  homeTeam: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  awayTeam: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },

}, { sequelize: db, timestamps: false, modelName: 'matchs', underscored: true });

Clubs.hasOne(Matchs, {
  foreignKey: 'homeTeam',
  as: 'club a',
});

Clubs.hasOne(Matchs, {
  foreignKey: 'awayTeam',
  as: 'club b',
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
