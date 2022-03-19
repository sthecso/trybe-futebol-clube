import { DataTypes, Model } from 'sequelize';
import db from '.';

class Club extends Model {
  public id: number;

  public clubName: string;
}

Club.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    clubName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'Club',
    tableName: 'clubs',
    underscored: true,
    timestamps: false,
  },
);

export default Club;
