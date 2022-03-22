import { Model, DataTypes } from 'sequelize';
import db from '.';

class Clubs extends Model {
  public id: number;

  public clubName: string;
}

Clubs.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  clubName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  tableName: 'clubs',
  timestamps: false,
});

export default Clubs;
