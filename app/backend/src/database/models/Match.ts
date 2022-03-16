import { DataTypes, Model } from "sequelize";
import db from ".";
import Club from './Club';

class Match extends Model {
    public id: number;
    public homeTeam: number;
    public homeTeamGgoals: number;
    public awayTeam: number;
    public awawayTeamGoalsay_team_goals: number;
    public inProgress: number;
}

Match.init(
  {
    id: DataTypes.INTEGER,
    homeTeam: DataTypes.INTEGER,
    homeTeamGgoals: DataTypes.INTEGER,
    awayTeam: DataTypes.INTEGER,
    awayTeamGoals: DataTypes.INTEGER,
    inProgress: DataTypes.INTEGER,
  },
  {
    sequelize: db,
    modelName: "Match",
    tableName: 'matchs',
    underscored: true,
    timestamps: false,
  }
);

Club.belongsTo(Match, { foreignKey: 'homeTeam', as: 'match' });
Club.belongsTo(Match, { foreignKey: 'awayTeam', as: 'match' });

Match.hasMany(Club, { foreignKey: 'homeTeam', as: 'homeTeam' });
Match.hasMany(Club, { foreignKey: 'awayTeam', as: 'awayTeam' });

export default Match;
