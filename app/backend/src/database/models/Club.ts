import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';

class Club extends Model {
  public id: number;

  public clubName: string;
}

Club.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  clubName: {
    type: STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Club',
  tableName: 'clubs',
  timestamps: false,
});

export default Club;
