import { DataTypes, Model } from 'sequelize/types';
import sequelize from '.';

class Users extends Model {
  public id!: number;

  public username: string;

  public role: string;

  public email: string;

  public password: string;
}

Users.init({
  id: {
    type: DataTypes.NUMBER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'users',
  underscored: true,
  timestamps: false,
});

export default Users;
