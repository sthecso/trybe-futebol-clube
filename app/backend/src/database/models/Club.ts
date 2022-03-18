import { Model, DataTypes } from 'sequelize';
import db from '.';

class Club extends Model {
  id: number;

  clubName: string;
}

Club.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    clubName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'clubs',
    timestamps: false,
    sequelize: db,
    modelName: 'Club',
    underscored: true,
  },
);

export default Club;
