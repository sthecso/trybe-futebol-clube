import { DataTypes, Model } from 'sequelize';
import db from '.';

class Club extends Model {
  public id: number;

  public clubName: string;
}

Club.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  clubName: {
    type: DataTypes.STRING,
  },
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
  modelName: 'Club',
  tableName: 'clubs',
});

export default Club;
