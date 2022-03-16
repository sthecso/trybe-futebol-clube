import { DataTypes, Model } from 'sequelize';
import db from '.';

class User extends Model {
  public id: number;

  public username: string;

  public email: string;

  public role: string;

  public password: string;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
  modelName: 'User',
  tableName: 'users',
});

export default User;
