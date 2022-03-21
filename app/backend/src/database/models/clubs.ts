import { Model, DataTypes } from 'sequelize';
import db from '.';

class Clubs extends Model {

}
Clubs.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    clubName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
    sequelize: db,
    tableName: 'clubs',
    timestamps: false,
  },
);

export default Clubs;
