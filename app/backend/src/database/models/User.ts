import { DataTypes, Model } from 'sequelize/types';
import db from '.';

class User extends Model {}

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
  },
);

// Using Sequelize documentation as example
// http://sequelize.org/master/manual/model-basics.html
