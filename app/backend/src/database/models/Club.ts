import { DataTypes, Model } from "sequelize";
import db from '.';

class Club extends Model {
  public id: number;
  public clubName: string;
}

Club.init(
  {
    id: DataTypes.INTEGER,
    clubName: DataTypes.STRING,
  },
  {
    sequelize: db,
    modelName: "Club",
    tableName: 'clubs',
    underscored: true,
    timestamps: false,
  }
);

export default Club;
