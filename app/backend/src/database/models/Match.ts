import { DataTypes, Model } from 'sequelize/types';
import db from '.';

export default class Match extends Model {}

Match.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    home_team: {
      type: DataTypes.INTEGER,
      references: {
        model: 'clubs',
        key: 'id',
      },
      allowNull: false,
    },
    home_team_goals: {
      type: DataTypes.INTEGER,
    },
    away_team: {
      type: DataTypes.INTEGER,
      references: {
        model: 'clubs',
        key: 'id',
      },
      allowNull: false,
    },
    away_team_goals: {
      type: DataTypes.INTEGER,
    },
    in_progress: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: db,
    modelName: 'Match',
  },
);

// Using Sequelize documentation as example
// http://sequelize.org/master/manual/model-basics.html
