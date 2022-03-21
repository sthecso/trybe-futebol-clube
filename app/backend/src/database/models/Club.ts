import { DataTypes, Model } from 'sequelize';
import db from '.';

class Club extends Model {
  public id: number;

  public clubName: string;
}
Club.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  clubName: DataTypes.STRING,
}, {
  sequelize: db,
  underscored: true,
  timestamps: false,
  modelName: 'Club',
  tableName: 'clubs',
});

export default Club;
