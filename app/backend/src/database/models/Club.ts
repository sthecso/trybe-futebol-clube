import { DataTypes, Model } from 'sequelize';
import db from '.';

export default class Club extends Model {
  public id: number;

  public clubName: string;
}

Club.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    clubName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    modelName: 'Club',
    sequelize: db,
    tableName: 'clubs',
    timestamps: false,
    underscored: true,
  },
);
