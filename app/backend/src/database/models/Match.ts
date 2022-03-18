import { Model, DataTypes } from 'sequelize';
import Club from './Club';
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
      references: {
        model: 'clubs',
        key: 'id',
      },
    },
    homeTeamGoals: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    awayTeam: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'clubs',
        key: 'id',
      },
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

Club.belongsTo(Match, { foreignKey: 'homeTeam', as: 'hometeam' });
Club.belongsTo(Match, { foreignKey: 'awayTeam', as: 'awayteam' });
Match.hasMany(Club, { foreignKey: 'id', as: 'homeTeamName' });
Match.hasMany(Club, { foreignKey: 'id', as: 'awayTeamName' });

export default Match;
