import { DataTypes, Model } from 'sequelize';
import db from '.';

class Users extends Model {
  public id: number;

  public username: string;

  public email: string;

  public role: string;

  public password: string;
}

Users.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  username: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING },
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
  modelName: 'Users',
  tableName: 'users',
});

export default Users;
