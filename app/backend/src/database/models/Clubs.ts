import { DataTypes, Model } from 'sequelize';
import db from '.';

type MatchAttributes = {
  id: number,
  clubName: string
};

class Club extends Model<MatchAttributes> {
  public id: number;

  public clubName: string;
}

Club.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  clubName: { type: DataTypes.STRING, field: 'club_name' },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Club',
  tableName: 'clubs',
  timestamps: false,
});

export default Club;
