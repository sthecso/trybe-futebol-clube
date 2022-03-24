import { DataTypes, Model } from 'sequelize';
import db from '.';

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
    field: 'home_team',
  },
  homeTeamGoals: {
    type: DataTypes.NUMBER,
    allowNull: false,
    field: 'home_team_goals',

  },
  awayTeam: {
    type: DataTypes.NUMBER,
    allowNull: false,
    field: 'away_team',
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    field: 'in_progress',
  },

}, { sequelize: db, timestamps: false, modelName: 'matchs', underscored: true });

export default Matchs;
