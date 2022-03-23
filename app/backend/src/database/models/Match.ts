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
// para cada club tem varios matchs
Club.hasMany(Match, { foreignKey: "homeTeam", as: "match" });
Club.hasMany(Match, { foreignKey: "awayTeam", as: "match" });
// match pertence a club
Match.belongsTo(Club, { foreignKey: "homeTeam", as: "club" });
Match.belongsTo(Club, { foreignKey: "awayTeam", as: "club" });

export default Match;
