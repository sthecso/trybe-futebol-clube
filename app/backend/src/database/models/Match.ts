import { Model, DataTypes } from 'sequelize';
import db from '.';

class Match extends Model {
  id: number;

  homeTeam: number;

  homeTeamGoals: number;

  awayTeam: number;

  awayTeamGoals: number;

  inProgress: boolean;
}

Match.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    homeTeam: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    homeTeamGoals: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    awayTeam: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    awayTeamGoals: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    inProgress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'matchs',
    timestamps: false,
    sequelize: db,
    modelName: 'Match',
    underscored: true,
  },
);

export default Match;
