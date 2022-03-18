import { DataTypes, Model } from 'sequelize';
import db from '.';

export default class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
    modelName: 'User',
    tableName: 'users',
  },
);

// Using Sequelize documentation as example
// http://sequelize.org/master/manual/model-basics.html
