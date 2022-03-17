import { DataTypes, Model } from 'sequelize';
import db from '.';
import Club from './Club';

interface MatchAttributes {
  id?: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export default class Match extends Model<MatchAttributes> {}

Match.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    homeTeam: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    homeTeamGoals: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    awayTeam: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    awayTeamGoals: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    inProgress: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
  },
  {
    modelName: 'Match',
    sequelize: db,
    tableName: 'matchs',
    timestamps: false,
    underscored: true,
  },
);

Club.hasMany(Match, { foreignKey: 'homeTeam', as: 'homeMatchs' });
Club.hasMany(Match, { foreignKey: 'awayTeam', as: 'awayMatchs' });

Match.belongsTo(Club, { foreignKey: 'homeTeam', as: 'homeClub' });
Match.belongsTo(Club, { foreignKey: 'awayTeam', as: 'awayClub' });
