import { Model, DataTypes } from 'sequelize';
import db from '.';

class Clubs extends Model {

}
Clubs.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    club_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'Clubs',
    timestamps: false,
  },
);

export default Clubs;
