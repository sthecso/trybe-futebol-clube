import { DataTypes, Model } from 'sequelize';
import db from '.';

class Club extends Model {
  id: number;
  clubName: string;
}

Club.init({
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
}, {
  sequelize: db,
  underscored: true,
  timestamps: false,
  modelName: 'Club',
  tableName: 'clubs',
});

export default Club;
