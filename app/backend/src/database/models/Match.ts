import { DataTypes, Model } from 'sequelize';
import db from '.';

class Matchs extends Model {}

Matchs.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  home_team: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  home_team_goals: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  away_team: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  in_progress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },

}, { sequelize: db, timestamps: false, modelName: 'matchs', underscored: true });

export default Matchs;
