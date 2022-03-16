import { Model, DataTypes } from 'sequelize';
import db from '.';

class User extends Model { }

User.init({
  username: DataTypes.STRING,
  role: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
}, {
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

export default User;
