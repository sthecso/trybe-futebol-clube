import { DataTypes, Model } from 'sequelize';
import sequelize from '.';

class Club extends Model {
  public id: number;

  public clubName: string;
}

Club.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    clubName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'Club',
    tableName: 'clubs',
  },
);

export default Club;
