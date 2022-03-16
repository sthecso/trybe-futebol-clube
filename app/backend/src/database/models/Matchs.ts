import { Model, DataTypes } from "sequelize";
import db from ".";

import Club from "./Club";

class Match extends Model {
  public id: number;

  public homeTeam: number;

  public homeTeamGoals: number;

  public awayTeam: number;

  public awayTeamGoals: number;

  public inProgress: boolean;
}

Match.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
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
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: "Match",
    tableName: "matchs",
    timestamps: false,
  }
);

Club.belongsTo(Match, { foreignKey: "id", as: "home_team" });
Club.belongsTo(Match, { foreignKey: "id", as: "away_team" });

Match.hasMany(Club, { foreignKey: "homeTeam", as: "homeTeam" });
Match.hasMany(Club, { foreignKey: "awayTeam", as: "awayTeam" });

export default Match;
