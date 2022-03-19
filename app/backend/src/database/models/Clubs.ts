import { DataTypes, Model } from 'sequelize';

import db from '.';

interface IMatch {
  id: number,
  club_name: string
};

class Club extends Model<IMatch> {
  public id: number;

  public clubName: string;
}

Club.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  club_name: {
    type: DataTypes.STRING,
  }
}, {
  sequelize: db,
  modelName: 'Club',
  tableName: 'clubs',
  timestamps: false,
});

export default Club;
