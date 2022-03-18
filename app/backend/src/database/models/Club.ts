import { DataTypes, Model } from 'sequelize/types';
import db from '.';

export default class Club extends Model {}

Club.init(
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
    sequelize: db,
    modelName: 'Club',
  },
);

// Using Sequelize documentation as example
// http://sequelize.org/master/manual/model-basics.html
