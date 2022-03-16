import { DataTypes, Model } from 'sequelize';
import db from '.';

class Club extends Model {
  public clubName: string;
}
Club.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  club_name: DataTypes.STRING,
}, {
  sequelize: db,
  underscored: true,
  modelName: 'Club',
  timestamps: false,
});

export default Club;
// test
